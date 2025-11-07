import './style.css';
import { render } from './ui';

// Initialize and render
render();

// Hot Module Replacement (for development)
if (import.meta.hot) {
  import.meta.hot.accept(); // TODO test this
}
  

// TODO div id=app = full screen and background image
