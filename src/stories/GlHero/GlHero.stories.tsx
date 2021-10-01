import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";
import { GlHero } from "../../GlHero";
import type { GlHeroProps } from "../../GlHero";
import heroImgSrc from "../assets/img/contribution.png";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlHero },
});

export default meta;

const props: GlHeroProps = {
    "linkToSectionBelowId": "sectionBelow",
    "imageSrc": heroImgSrc,
    "title": "Hero Title",
    "subTitle": "Hero Subtitle",
};

export const Vue = getStory({
    ...props,
});
