// __mocks__/react-router-dom.js

const actualReactRouterDom = jest.requireActual('react-router-dom');

const mockUseNavigate = jest.fn();

module.exports = {
  ...actualReactRouterDom,
  useNavigate: () => mockUseNavigate,
};
