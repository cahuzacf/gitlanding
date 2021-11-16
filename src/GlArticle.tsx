import { memo, useMemo, useReducer } from "react";
import type { ReactNode } from "react";
import { makeStyles } from "./theme";
import { breakpointsValues } from "./theme";
import ReactMarkdown from "react-markdown";
import { GlButton } from "./utils/GlButton";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "./tools/useIntersectionObserver";
import { assert } from "tsafe";

export type GlArticleProps = {
    className?: string;
    classes?: {
        contentWrapper?: string;
        article?: string;
        title?: string;
        body?: string;
        buttonWrapper?: string;
        button?: string;
        illustrationWrapper?: string;
    };
    id?: string;
    title?: string;
    body?: string;
    buttonLabel?: string;
    buttonLink?: {
        href: string;
        onClick?: () => void;
    };
    illustrationPosition?: "left" | "right";
    illustration?: ReactNode;
    animationVariant?: "primary" | "secondary";
};

export const GlArticle = memo((props: GlArticleProps) => {
    const {
        illustration,
        body,
        buttonLabel,
        illustrationPosition,
        title,
        className,
        id,
        buttonLink,
        animationVariant,
        classes: classesProp,
    } = props;

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const { classes, cx } = useStyles({
        "illustrationPosition": illustrationPosition ?? "right",
        "hasIllustration": illustration !== undefined,
        "hasArticle":
            title !== undefined ||
            body !== undefined ||
            buttonLabel !== undefined,
    });

    const textTransitionParameters = useMemo(() => {
        return (
            animationVariant && {
                "ease": "easeOut",
                "duration": 0.5,
                "delay": 0.3,
            }
        );
    }, []);

    const illustrationAnimationProps = useMemo(() => {
        return (
            animationVariant && {
                "initial": (() => {
                    switch (animationVariant) {
                        case "secondary":
                            return {
                                "rotateY": "15deg",
                                "rotateX": "15deg",
                            };
                        default:
                            return {
                                "opacity": 0,
                                "x":
                                    illustrationPosition === "left"
                                        ? -100
                                        : 100,
                            };
                    }
                })(),

                "animate": {},
                "transition": {
                    "delay": 1,
                    "duration": 1,
                    "ease": "easeOut",
                },
            }
        );
    }, []);

    const titleAnimationProps = useMemo(() => {
        return (
            animationVariant && {
                "initial": {
                    "opacity": 0,
                    "x": (() => {
                        const value = 100;
                        switch (illustrationPosition) {
                            case "left":
                                return value;
                            default:
                                return -value;
                        }
                    })(),
                },
                "animate": {},
                "transition": textTransitionParameters,
            }
        );
    }, []);

    const bodyAnimationProps = useMemo(() => {
        return (
            animationVariant && {
                "initial": {
                    "opacity": 0,
                },
                "animate": {},
                "transition": textTransitionParameters,
            }
        );
    }, []);

    const { ref } = useIntersectionObserver({
        "callback": ({ observer, entry }) => {
            if (animationVariant === undefined) {
                observer.unobserve(entry.target);
                return;
            }

            assert(
                illustrationAnimationProps !== undefined &&
                    titleAnimationProps !== undefined &&
                    bodyAnimationProps !== undefined,
            );

            if (entry.isIntersecting) {
                illustrationAnimationProps.animate = (() => {
                    switch (animationVariant) {
                        case "secondary":
                            return {
                                "rotateX": 0,
                                "rotateY": 0,
                            };
                        default:
                            return {
                                "opacity": 1,
                                "x": 0,
                            };
                    }
                })();
                titleAnimationProps.animate = {
                    "opacity": 1,
                    "x": 0,
                };
                bodyAnimationProps.animate = {
                    "opacity": 1,
                };
                observer.unobserve(entry.target);
                forceUpdate();
            }
        },
    });

    return (
        <section id={id} className={className}>
            <div
                className={cx(
                    classes.contentWrapper,
                    classesProp?.contentWrapper,
                )}
            >
                {(title !== undefined ||
                    body !== undefined ||
                    buttonLabel !== undefined) && (
                    <article
                        className={cx(classes.article, classesProp?.article)}
                    >
                        {title && (
                            <motion.div {...titleAnimationProps}>
                                <ReactMarkdown
                                    className={cx(
                                        classes.title,
                                        classesProp?.title,
                                    )}
                                >
                                    {title}
                                </ReactMarkdown>
                            </motion.div>
                        )}
                        {body && (
                            <motion.div {...bodyAnimationProps} ref={ref}>
                                <ReactMarkdown
                                    className={cx(
                                        classes.body,
                                        classesProp?.body,
                                    )}
                                >
                                    {body}
                                </ReactMarkdown>
                            </motion.div>
                        )}
                        {buttonLabel && (
                            <div
                                className={cx(
                                    classes.buttonWrapper,
                                    classesProp?.buttonWrapper,
                                )}
                            >
                                <GlButton
                                    className={cx(
                                        classes.button,
                                        classesProp?.button,
                                    )}
                                    type="submit"
                                    href={buttonLink?.href}
                                    onClick={buttonLink?.onClick}
                                    variant="secondary"
                                >
                                    {buttonLabel}
                                </GlButton>
                            </div>
                        )}
                    </article>
                )}

                <motion.div {...illustrationAnimationProps}>
                    <aside
                        className={cx(
                            classes.aside,
                            classesProp?.illustrationWrapper,
                        )}
                    >
                        {illustration}
                    </aside>
                </motion.div>
            </div>
        </section>
    );
});

const useStyles = makeStyles<{
    illustrationPosition: "left" | "right";
    hasIllustration: boolean;
    hasArticle: boolean;
}>()((theme, { illustrationPosition, hasIllustration, hasArticle }) => ({
    "contentWrapper": {
        "display": "flex",
        "flexDirection": (() => {
            if (
                illustrationPosition === "left" &&
                theme.windowInnerWidth >= breakpointsValues.md
            ) {
                return "row-reverse";
            }

            if (theme.windowInnerWidth < breakpointsValues.md) {
                return "column";
            }

            return undefined;
        })(),
        "alignItems":
            theme.windowInnerWidth < breakpointsValues.md ? "left" : "center",
        "justifyContent": "center",

        ...(() => {
            const value = theme.spacing(7);

            return {
                "marginTop": value,
                "marginBottom": value,
            };
        })(),
        ...(() => {
            const value = theme.spacing(8);
            if (theme.windowInnerWidth < breakpointsValues.lg || !hasArticle) {
                return undefined;
            }
            if (illustrationPosition === "left") {
                return {
                    "paddingRight": value,
                };
            }

            return {
                "paddingLeft": value,
            };
        })(),
    },
    "title": {
        ...theme.typography.variants["page heading"].style,
    },
    "article": {
        "display": "flex",
        "flexDirection": "column",
        "textAlign": "left",
        "marginBottom": (() => {
            if (
                theme.windowInnerWidth >= breakpointsValues.md ||
                !hasIllustration
            ) {
                return undefined;
            }

            return theme.spacing(8);
        })(),
        "width": (() => {
            if (!hasIllustration) {
                return undefined;
            }

            if (theme.windowInnerWidth >= breakpointsValues.xl) {
                return 412;
            }

            if (theme.windowInnerWidth >= breakpointsValues["lg+"]) {
                return 311;
            }

            if (theme.windowInnerWidth >= breakpointsValues.md) {
                return 270;
            }

            return undefined;
        })(),

        ...(() => {
            const value =
                theme.windowInnerWidth >= breakpointsValues.lg
                    ? theme.spacing(9)
                    : theme.spacing(5);
            if (
                theme.windowInnerWidth < breakpointsValues.md ||
                !hasIllustration
            ) {
                return undefined;
            }
            if (illustrationPosition === "left") {
                return {
                    "marginLeft": value,
                };
            }

            return {
                "marginRight": value,
            };
        })(),
    },
    "body": {
        ...theme.typography.variants["body 1"].style,
        "margin": theme.spacing({
            "topBottom": 4,
            "rightLeft": 0,
        }),
        "color": theme.colors.useCases.typography.textSecondary,
    },
    "buttonWrapper": {
        "display": "flex",
        "justifyContent": "flex-end",
    },
    "button": {
        "alignSelf": "right",
    },
    "aside": {
        ...(theme.windowInnerWidth >= breakpointsValues.md
            ? {
                  ...(() => {
                      if (!hasArticle) {
                          return undefined;
                      }
                      const value = theme.spacing(8);
                      switch (illustrationPosition) {
                          case "left":
                              return {
                                  "marginRight": value,
                              };
                          case "right":
                              return {
                                  "marginLeft": value,
                              };
                      }
                  })(),
                  "maxWidth": 800,
              }
            : {}),
    },
}));
