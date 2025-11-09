import { CHARACTERS } from './data/characters';
import { FILTERS } from './data/filters';
import { initialiseState, setActiveCharacter, setActiveFilter, setShowLocked } from './state';
import './style.css';
import type { FilterId } from './types';
import { render } from './ui';
 
const validFilterIds = FILTERS.map(f => f.id);
const validCharacterIds = CHARACTERS.map(c => c.id);

let state = initialiseState();

render(state);

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;

  if (!(target instanceof HTMLElement)) return;
  
  const filterButton = target.closest('[data-filter-id]') as HTMLElement | null;
  const characterCard = target.closest('[data-character-id]') as HTMLElement | null;

  if (filterButton || characterCard) {
    e.preventDefault(); 
  }
  
  if (filterButton)  {
    const filterId = filterButton.dataset.filterId;

    if(filterId && isValidFilterId(filterId)) {
      state = setActiveFilter(state, filterId);
      render(state);
    }
  }
  else if (characterCard)  {
    const characterId = characterCard.dataset.characterId;

    if(characterId && isValidCharacterId(characterId)) {
      state = setActiveCharacter(state, characterId);
      render(state);
    }
  }
});

document.addEventListener('change', (e) => {
  const target = e.target as HTMLInputElement;
  
  if (target.type === 'checkbox' && target.id === 'lockedToggle') {
    const isChecked = target.checked; // true or false
    state = setShowLocked(state, isChecked);
    render(state);
  }
});

function isValidFilterId(value: string): value is FilterId {
  return (validFilterIds as string[]).includes(value);
}

function isValidCharacterId(value: string) {
  return validCharacterIds.includes(value);
}

// Hot Module Replacement (for development)
if (import.meta.hot) {
  import.meta.hot.accept(); // TODO test this
}
