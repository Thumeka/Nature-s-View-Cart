import { TextEncoder, TextDecoder } = 'node:util'

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
