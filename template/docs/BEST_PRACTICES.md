Create React App Starter Template by:

[![SpaceDev](https://uploads-ssl.webflow.com/61e097dd988731696768be21/62042f55a072ef02ab1d11a2_logo%20del%20mismo%20taman%CC%83o%20que%20el%20texto.svg)](https://www.spacedev.io/)

**[Go Back](../README.md)**

# Best Practices

## Styled Components

**Naming Scheme**

`Styled` + `OptionalDescription` + `HtmlElementName_OR_ComponentBeingExtended`

**Examples:**

```typescript
// navite components
const StyledDiv = styled.div;
const StyledP = styled.p;
```

```typescript
// custom components
const StyledButton = styled(Button);
const StyledModalFooter = styled(ModalFooter);
```

If you are styling multiple elements of the same type or think one needs some clarification then you should include an OptionalDescription

**Examples:**

```typescript
const StyledFooDiv = styled.div;
const StyledBarDiv = styled.div;
const StyledBatDiv = styled.div;
```

This structure immediately lets any reader know:

- this is not a component with any functionality, it is only being named for style purposes
- what type of native element is being used to prevent any html semantic mistakes
