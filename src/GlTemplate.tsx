import { useEffect, useState, memo } from "react";
import { makeStyles, ThemeProviderDefault } from "./theme";
import type { ReactNode } from "react";
import { useSplashScreen } from "onyxia-ui";
import type { ComponentType } from "./tools/ComponentType";
import type { ThemeProviderProps } from "onyxia-ui";
import { useIsThemeProvided } from "onyxia-ui/lib/ThemeProvider";
import { useDomRect } from "onyxia-ui";
import { useElementEvt } from "evt/hooks";
import { Evt } from "evt";
import { changeColorOpacity } from "onyxia-ui";
import { GlLinkToTop } from "./utils/GlLinkToTop";
import { useMergedClasses } from "tss-react";

export const splashScreenState = {
    "isShown": true,
};
export const scrollableDivId = "GlScrollable";
export type HeaderOptions = HeaderOptions.Fixed | HeaderOptions.TopOfPage;

export namespace HeaderOptions {
    export type Fixed = {
        position: "fixed";
        /** Default false */
        isRetracted?: boolean | "smart";
    };

    export type TopOfPage = {
        position: "top of page";
        /** Default false */
        isRetracted?: boolean;
        /** Default false */
        doDelegateScroll?: boolean;
    };
}

export type GlTemplateProps = {
    header?: ReactNode;
    footer?: ReactNode;
    SplashScreenLogo?: ComponentType<{ className: string }>;
    splashScreenLogoFillColor?: string;
    children: ReactNode;
    ThemeProvider?: ComponentType<{
        splashScreen?: NonNullable<ThemeProviderProps["splashScreen"]>;
        children: ReactNode;
    }>;
    headerOptions?: HeaderOptions;
    className?: string;
    hasTopOfPageLinkButton?: boolean;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
};

const GlTemplateInner = memo(
    (
        props: Omit<GlTemplateProps, "SplashScreenLogo"> & {
            isThemeProvidedOutside: boolean;
        },
    ) => {
        const {
            header,
            isThemeProvidedOutside,
            children,
            footer,
            className,
            classes: classesProp,
            hasTopOfPageLinkButton,
        } = props;

        const headerOptions: Required<HeaderOptions> = (() => {
            const { headerOptions } = props;

            if (headerOptions === undefined) {
                return {
                    "position": "fixed",
                    "isRetracted": false,
                } as const;
            }

            switch (headerOptions.position) {
                case "fixed":
                    return {
                        ...headerOptions,
                        "isRetracted": headerOptions.isRetracted ?? false,
                    };
                case "top of page":
                    return {
                        ...headerOptions,
                        "isRetracted": headerOptions.isRetracted ?? false,
                        "doDelegateScroll":
                            headerOptions.doDelegateScroll ?? false,
                    };
            }
        })();

        {
            const { hideRootSplashScreen } = useSplashScreen();

            useEffect(() => {
                if (isThemeProvidedOutside) {
                    return;
                }

                hideRootSplashScreen();
            }, []);
        }

        const {
            ref: headerWrapperRef,
            domRect: { height: headerHeight },
        } = useDomRect();
        const {
            ref: childrenWrapperRef,
            domRect: { width: rootWidth },
        } = useDomRect();

        const [isSmartHeaderVisible, setIsSmartHeaderVisible] = useState(true);

        useElementEvt(
            ({ ctx, element }) => {
                if (headerOptions.isRetracted !== "smart") {
                    return;
                }

                let previousScrollTop = 0;

                Evt.from(ctx, element, "scroll").attach(e => {
                    const scrollTop = (e as any).target.scrollTop;

                    setIsSmartHeaderVisible(
                        scrollTop < previousScrollTop
                            ? true
                            : scrollTop <= headerHeight,
                    );

                    previousScrollTop = scrollTop;
                });
            },
            childrenWrapperRef,
            [headerHeight, headerOptions.isRetracted],
        );

        let { classes, cx } = useStyles({
            rootWidth,
            headerHeight,
            "isHeaderRetracted":
                headerOptions.isRetracted === "smart"
                    ? !isSmartHeaderVisible
                    : headerOptions.isRetracted,
            "headerPosition": headerOptions.position,
            "doDelegateScroll":
                headerOptions.position === "fixed"
                    ? false
                    : headerOptions.doDelegateScroll,
        });

        classes = useMergedClasses(classes, classesProp);

        return (
            <div className={cx(classes.root, className)}>
                <div className={classes.headerWrapper}>
                    <div ref={headerWrapperRef}>{header}</div>
                </div>
                <div
                    className={classes.childrenWrapper}
                    ref={childrenWrapperRef}
                    id={
                        headerOptions.position === "top of page" &&
                        headerOptions.doDelegateScroll
                            ? undefined
                            : scrollableDivId
                    }
                >
                    {children}
                    {hasTopOfPageLinkButton && <GlLinkToTop />}
                    <div className={classes.footerWrapper}>{footer}</div>
                </div>
            </div>
        );
    },
);

export const GlTemplate = memo((props: GlTemplateProps) => {
    const {
        ThemeProvider = ThemeProviderDefault,
        SplashScreenLogo,
        splashScreenLogoFillColor,
        ...rest
    } = props;

    const isThemeProvided = useIsThemeProvided();

    const children = (
        <GlTemplateInner {...rest} isThemeProvidedOutside={isThemeProvided} />
    );

    return isThemeProvided ? (
        children
    ) : (
        <ThemeProvider
            splashScreen={
                SplashScreenLogo === undefined
                    ? undefined
                    : {
                          "Logo": SplashScreenLogo,
                          "fillColor": splashScreenLogoFillColor,
                          "minimumDisplayDuration": 0,
                      }
            }
        >
            {children}
        </ThemeProvider>
    );
});

const useStyles = makeStyles<{
    headerHeight: number;
    rootWidth: number;
    isHeaderRetracted: boolean;
    headerPosition: "fixed" | "top of page";
    doDelegateScroll: boolean;
}>({ "name": { GlTemplate } })(
    (
        theme,
        {
            headerHeight,
            rootWidth,
            isHeaderRetracted,
            headerPosition,
            doDelegateScroll,
        },
    ) => {
        const paddingTopBottom = theme.spacing(3);
        const headerHeightPlusMargin = headerHeight + 2 * paddingTopBottom;

        return {
            "root": {
                "height": "100%",
                ...(() => {
                    switch (headerPosition) {
                        case "fixed":
                            return {
                                "visibility":
                                    headerHeight === 0 || rootWidth === 0
                                        ? "hidden"
                                        : "visible",
                            } as const;
                        case "top of page":
                            return doDelegateScroll
                                ? ({
                                      "display": "flex",
                                      "flexDirection": "column",
                                  } as const)
                                : ({
                                      "overflow": "auto",
                                      "scrollBehavior": "smooth",
                                  } as const);
                    }
                })(),
            },
            "headerWrapper": {
                ...theme.spacing.topBottom("padding", `${paddingTopBottom}px`),
                ...(() => {
                    switch (headerPosition) {
                        case "fixed":
                            return {
                                "zIndex": 1000,
                                "position": "fixed",
                                "width": rootWidth,
                                "transition": "top 350ms",
                                "top": !isHeaderRetracted
                                    ? 0
                                    : -headerHeightPlusMargin,
                                "backgroundColor": changeColorOpacity({
                                    "color":
                                        theme.colors.useCases.surfaces
                                            .background,
                                    "opacity": 0.94,
                                }),
                            } as const;
                        case "top of page":
                            return {
                                ...(() => {
                                    const height =
                                        headerHeight === 0
                                            ? undefined
                                            : isHeaderRetracted
                                            ? 0
                                            : headerHeightPlusMargin;

                                    return {
                                        height,
                                        ...(height !== 0
                                            ? {}
                                            : {
                                                  "paddingBottom": 0,
                                              }),
                                    };
                                })(),
                                "overflow": "hidden",
                                "transition": ["height", "padding"]
                                    .map(prop => `${prop} 250ms`)
                                    .join(", "),
                            } as const;
                    }
                })(),
            },

            "footerWrapper": {
                "marginTop": "auto",
                "position": "relative",
                "width": rootWidth,
                "left": -theme.paddingRightLeft,
            },
            "childrenWrapper": {
                "display": "flex",
                "flexDirection": "column",
                "overflowX": "hidden",
                "& > :first-child": {
                    "position": "relative",
                    "paddingTop":
                        headerPosition === "fixed"
                            ? headerHeightPlusMargin
                            : undefined,
                    "width": rootWidth,
                    "left": -theme.paddingRightLeft,
                    ...theme.spacing.rightLeft(
                        "padding",
                        `${theme.paddingRightLeft}px`,
                    ),
                },
                ...theme.spacing.rightLeft(
                    "padding",
                    `${theme.paddingRightLeft}px`,
                ),
                ...(() => {
                    switch (headerPosition) {
                        case "fixed":
                            return {
                                "height": "100%",
                                "zIndex": 1,
                                "overflowY": "auto",
                                "scrollBehavior": "smooth",
                            } as const;
                        case "top of page":
                            return doDelegateScroll
                                ? ({
                                      "flex": 1,
                                      "overflow": "hidden",
                                  } as const)
                                : {};
                    }
                })(),
            },
        };
    },
);
