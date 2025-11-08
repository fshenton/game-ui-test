import { CHARACTERS } from "./data/characters";
import { FILTERS } from "./data/filters";

export function render(): void {
    const app = document.querySelector("#app");

    if(app) {
        app.innerHTML = "";

        app.appendChild(createHeading());
        app.appendChild(createScreenDivider());
        app.appendChild(createMainContainer())
        app.appendChild(createFooter());
    }

}

function createHeading(): HTMLDivElement {
    const headingContainer = document.createElement("div");
    headingContainer.id = "headingContainer";

    const heading = document.createElement("h1"); 
    heading.innerText = "CHARACTERS";

    headingContainer.appendChild(heading);

    return headingContainer;
}

function createScreenDivider(): HTMLImageElement {
    const screenDivider = document.createElement("img");
    screenDivider.className = "screenDivider";
    screenDivider.src = "./assets/images/screen layers/screen divider.png";

    return screenDivider;
}

export function createMainContainer(): HTMLElement {
    const mainContainer = document.createElement("main");

    mainContainer.appendChild(createControlSection());
    mainContainer.appendChild(createCharacterSection());

    return mainContainer;
}

function createControlSection(): HTMLDivElement {
    const controlSection = document.createElement("div");
    controlSection.id = "controlSection";

    const filterList = document.createElement("ul");
    filterList.id = "filterList";

    createFilters().forEach(filter => filterList.appendChild(filter));

    controlSection.appendChild(filterList);
    controlSection.appendChild(createLockedToggle());

    return controlSection;
}

function createFilters(): HTMLLIElement[] {
    // Could hardcode the HTML as a template string to make it more readable at a glance but:
    // 1) hard to debug & catch errors without syntax highlighting or type checking
    // 2) lots of duplication & bloat as most of the HTML is the same for each filter
    // 3) would need to update if we ever added more filters or changed existing ones, instead of simply editing the data file

    const filterElements = FILTERS.map((filter) => {
        const { name, id } = filter;
        
        const listItem = document.createElement("li");

        const button = document.createElement("button");
        button.setAttribute("data-filter-id", id);

        const icon = document.createElement("img");
        icon.className = "icon";
        icon.src = `./assets/images/icons/${id}.png`;
        
        const buttonLabel = document.createElement("div");
        buttonLabel.className = "name";
        buttonLabel.innerText = name;

        button.appendChild(icon);
        button.appendChild(buttonLabel);

        listItem.append(button);

        return listItem;
    });

    return filterElements;
}

function createLockedToggle(): HTMLDivElement {
    const lockedToggleWrapper = document.createElement("div");
    lockedToggleWrapper.id = "lockedToggleWrapper";

    // TODO confirm that background-image transitions are ok to use, else include the img elements
    // Either we have two images: one for locked and one for unlocked and we switch opacitys
    // Or we have an empty div that we change the background-image for
    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.id = "lockedToggle";

    const label = document.createElement("label");
    label.innerText = "Show locked";
    label.htmlFor = "lockedToggle";

    const underline = document.createElement("img");
    underline.id = "toggleUnderline";
    underline.src = "./assets/images/toggle/underline.png";

    lockedToggleWrapper.appendChild(toggle);
    lockedToggleWrapper.appendChild(label);
    lockedToggleWrapper.appendChild(underline);

    return lockedToggleWrapper;
}

function createCharacterSection(): HTMLDivElement {
    const characterSection = document.createElement("div");
    characterSection.id = "characterSection"

    const characterPanels = createCharacterPanels();
    characterPanels.forEach(panel => characterSection.appendChild(panel));

    return characterSection;
}

function createCharacterPanels(): HTMLDivElement[] {
     const characterPanels = CHARACTERS.map((character) => {
        const { id, name, class: characterClass, level } = character;

        const panel = document.createElement("div");
        panel.className = "character";
        panel.setAttribute("data-character-id", id);
        panel.setAttribute("role", "button");
        panel.setAttribute("tabindex", "0");

        const charPortrait = document.createElement("img");
        charPortrait.className = "portrait"
        charPortrait.src = `./assets/images/character/portraits/${id}.png`;
        
        const charFgLayer = document.createElement("img");
        charFgLayer.className = "foregroundLayer";
        charFgLayer.src = `./assets/images/character/fgInactive.png`; // TODO Active, Inactive, Locked, Unlocked depending on state

        const textContainer = document.createElement("div");
        textContainer.className = "textContainer";
        
        const charName = document.createElement("div");
        charName.className = "name"
        charName.innerText = name;

        const charLevel = document.createElement("div");
        charLevel.className = "level"
        charLevel.innerText = `${level}/ 15`;

        textContainer.appendChild(charName);
        textContainer.appendChild(charLevel);
        
        const classIcon = document.createElement("img");
        classIcon.className = "classIcon";
        classIcon.src = `./assets/images/icons/${characterClass}.png`;
        // TODO confirm that background-image transitions are ok to use, else include the img elements

        panel.appendChild(charPortrait); 
        panel.appendChild(charFgLayer);
        panel.appendChild(textContainer);
        panel.appendChild(classIcon);

        return panel;

    })

    return characterPanels;
}

function createFooter(): HTMLElement {
    // TODO should just be background-image for this

    const footer = document.createElement("footer");

    return footer;
}
