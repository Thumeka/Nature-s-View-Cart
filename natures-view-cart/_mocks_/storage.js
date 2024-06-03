const getStorage = jest.fn();
const ref = jest.fn();
const uploadBytes = jest.fn();
const getDownloadURL = jest.fn().mockResolvedValue('https://example.com/image.jpg');

export { getStorage, ref, uploadBytes, getDownloadURL };

