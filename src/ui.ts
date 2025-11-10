import { CHARACTERS } from "./data/characters";
import { FILTERS } from "./data/filters";
import type { AppState } from "./types";

export function render(state: AppState): void {
    const app = document.querySelector("#app");

    if(app) {
        app.innerHTML = "";

        app.appendChild(createHeading());
        app.appendChild(createScreenDivider());
        app.appendChild(createMainContainer(state))
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
    screenDivider.id = "screenDivider";
    screenDivider.src = "/assets/images/static/ScreenDivider.png";

    return screenDivider;
}

export function createMainContainer(state: AppState): HTMLElement {
    const mainContainer = document.createElement("main");

    mainContainer.appendChild(createControlSection(state));
    mainContainer.appendChild(createCharacterSection(state));

    return mainContainer;
}

function createControlSection(state: AppState): HTMLDivElement {
    const controlSection = document.createElement("div");
    controlSection.id = "controlSection";

    const filterList = document.createElement("ul");
    filterList.id = "filterList";

    createFilters(state).forEach(filter => filterList.appendChild(filter));

    controlSection.appendChild(filterList);
    controlSection.appendChild(createLockedToggle(state));

    return controlSection;
}

function createFilters(state: AppState): HTMLLIElement[] {
    const filterElements = FILTERS.map((filter) => {
        const { name, id } = filter;
        
        const listItem = document.createElement("li");

        console.log('id :>> ', id);
        console.log('state.activeFilterId :>> ', state.activeFilterId);

        const button = document.createElement("button");
        button.setAttribute("data-filter-id", id);
        button.setAttribute("data-is-active", id === state.activeFilterId ? "true" : "false");

        const activeBg = document.createElement("img");
        activeBg.className = "bg bg-active";
        activeBg.src = `/assets/images/controls/filters/button_active.png`;

        const normalBg = document.createElement("img");
        normalBg.className = "bg bg-normal";
        normalBg.src = `/assets/images/controls/filters/button_normal.png`;

        const hoveredBg = document.createElement("img");
        hoveredBg.className = "bg bg-hovered";
        hoveredBg.src = `/assets/images/controls/filters/button_hovered.png`;

        const icon = document.createElement("img");
        icon.className = "icon";
        icon.src = `/assets/images/icons/${id}.png`;
        
        const buttonLabel = document.createElement("div");
        buttonLabel.className = "name";
        buttonLabel.innerText = name;

        button.appendChild(activeBg);
        button.appendChild(normalBg);
        button.appendChild(hoveredBg);
        button.appendChild(icon);
        button.appendChild(buttonLabel);

        listItem.append(button);

        return listItem;
    });

    return filterElements;
}

function createLockedToggle(state: AppState): HTMLDivElement {
    const lockedToggleWrapper = document.createElement("div");
    lockedToggleWrapper.id = "lockedToggleWrapper";

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.id = "lockedToggle";
    toggle.checked = state.showLocked;

    const label = document.createElement("label");
    label.innerText = "Show locked";
    label.htmlFor = "lockedToggle";

    const underline = document.createElement("img");
    underline.id = "toggleUnderline";
    underline.src = "/assets/images/controls/lockedToggle/underline.png";

    lockedToggleWrapper.appendChild(toggle);
    lockedToggleWrapper.appendChild(label);
    lockedToggleWrapper.appendChild(underline);

    return lockedToggleWrapper;
}

function createCharacterSection(state: AppState): HTMLDivElement {
    const characterSection = document.createElement("div");
    characterSection.id = "characterSection"

    const characterPanels = createCharacterPanels(state);
    characterPanels.forEach(panel => characterSection.appendChild(panel));

    return characterSection;
}

function createCharacterPanels(state: AppState): HTMLDivElement[] {
    const { activeFilterId: filterClass, showLocked, lockedCharacterIds } = state;
    const activeCharacters = CHARACTERS.filter((character) => {
        let isActive = true;

        if(!showLocked && lockedCharacterIds.includes(character.id)) isActive = false;
        if(filterClass !== "all" && character.class !== filterClass) isActive = false;

        return isActive;
    });

    const visibleCharacterPanels = activeCharacters.map((character) => {
        const { id, name, class: characterClass, level, portraitPath } = character;

        const isActive = id === state.activeCharacterId;
        const isLocked = state.lockedCharacterIds.includes(id);

        const panel = document.createElement("div");
        panel.className = "character";
        panel.setAttribute("data-character-id", id);
        panel.setAttribute("data-active", isActive ? "true" : "false");
        panel.setAttribute("data-locked", isLocked ? "true" : "false");
        panel.setAttribute("role", "button");
        panel.setAttribute("tabindex", "0");

        const portraitWrapper = document.createElement("div");
        portraitWrapper.className = "portraitWrapper";

        const charPortrait = document.createElement("img");
        charPortrait.className = "portrait"
        charPortrait.src = portraitPath;

        portraitWrapper.appendChild(charPortrait)

        const bgNormal = document.createElement("img");
        bgNormal.className = "background bg-normal";
        bgNormal.src = `/assets/images/characters/layers/bg_normal.png`;

        const bgActive = document.createElement("img");
        bgActive.className = "background bg-active";
        bgActive.src = `/assets/images/characters/layers/bg_active.png`;

        const fgNormal = document.createElement("img");
        fgNormal.className = "foreground fg-normal";
        fgNormal.src = `/assets/images/characters/layers/fg_normal.png`;

        const fgActive = document.createElement("img");
        fgActive.className = "foreground fg-active";
        fgActive.src = `/assets/images/characters/layers/fg_active.png`;

        const fgNormalLocked = document.createElement("img");
        fgNormalLocked.className = "foreground fg-normal-locked";
        fgNormalLocked.src = `/assets/images/characters/layers/fg_normal_locked.png`;

        const fgActiveLocked = document.createElement("img");
        fgActiveLocked.className = "foreground fg-active-locked";
        fgActiveLocked.src = `/assets/images/characters/layers/fg_active_locked.png`;

        const textContainer = document.createElement("div");
        textContainer.className = "textContainer";
        
        const charName = document.createElement("div");
        charName.className = "name"
        charName.innerText = name;

        const charLevel = document.createElement("div");
        charLevel.className = "level"
        charLevel.innerText = `${level}/15`;

        textContainer.appendChild(charName);
        textContainer.appendChild(charLevel);
        
        const classIcon = document.createElement("img");
        classIcon.className = "classIcon";
        classIcon.src = `/assets/images/icons/${characterClass}.png`;

        panel.appendChild(portraitWrapper); 
        panel.appendChild(bgNormal); 
        panel.appendChild(bgActive); 
        panel.appendChild(fgNormal);
        panel.appendChild(fgActive);
        panel.appendChild(fgNormalLocked);
        panel.appendChild(fgActiveLocked);
        panel.appendChild(textContainer);
        panel.appendChild(classIcon);

        return panel;

    })

    return visibleCharacterPanels;
}

function createFooter(): HTMLElement {
    const footer = document.createElement("footer");

    return footer;
}
