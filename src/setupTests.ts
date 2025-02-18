import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import {
  TextDecoder as NodeTextDecoder,
  TextEncoder as NodeTextEncoder,
} from 'util';

global.TextDecoder = NodeTextDecoder as typeof TextDecoder;
global.TextEncoder = NodeTextEncoder as typeof TextEncoder;
