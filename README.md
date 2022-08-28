# Bikematic

Proof of concept of a webapp to rent bicycles

## Demo

https://bikematic.onrender.com

## Authors

Omar Hernandez

- [@omarbastos](https://www.github.com/omarbastos) (Hobby Profile)
- [@ohernandez-hb](https://www.github.com/ohernandez-hb) (Work Profile)

## Stack

- [Vite](https://vitejs.dev/)
- [Tailwind](https://tailwindcss.com/)
- [React 18](https://reactjs.org/)
- [DaisyUI](https://daisyui.com/)
- [Mockaroo](https://www.mockaroo.com/)

## Installation

Install bikematic with yarn

```bash
  yarn install
  yarn build
  yarn preview
```

Development

```bash
  yarn install
  yarn dev
```

## Support

For support, email omarsro@gmail.com

## Considerations

- The cost of the extra days is $15, considering that they are days that should be more expensive.
- A global context was used due to the size of the project, for performance it is better to use the native React API as useContext than redux
- Mockaroo was used to generate fictitious data that can be consumed as a real endpoint
- Although react router dom is included, it is not necessary to use different routes due to the flow, guaranteeing the form through modals, the user experience feels much more fluid
- Orders are saved in localstorage with the name `orders`
- Added an alert to notify that an order has been scheduled

## Roadmap

- Add tests with react testing library

- Add a backend with Nestjs

- Add a auth system with JWT Token
