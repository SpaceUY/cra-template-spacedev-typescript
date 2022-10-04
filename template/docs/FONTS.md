Create React App Starter Template by:

[![SpaceDev](https://uploads-ssl.webflow.com/61e097dd988731696768be21/62042f55a072ef02ab1d11a2_logo%20del%20mismo%20taman%CC%83o%20que%20el%20texto.svg)](https://www.spacedev.io/)

**[Go Back](../README.md)**

# Fonts

## The Preferred Way

The default (and preferred) way of loading fonts is to use fonts hosted by a third party and referencing them on the page's `<head>` tag.

```html
<!-- public/index.html -->

<html lang="en">
  <head>
    ...
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,700;1,100;1,400;1,700&display=swap"
      rel="stylesheet"
    />
  </head>
  ...
</html>
```

The axample above comes from [Google Fonts](https://fonts.google.com/) and it's used as the default font for the template.

If you decide to use another method please remember to remove this.

Each third party will provide you with the optimal way of loading fonts from their service.

Once you loaded the font see the [Step 4 of the Self Hosting and Custom Fonts](#step-4) section

> | **Pros** 👍                                                                                                                                               | **Cons** 👎                                                                                                                                               |
> | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | These third-party-hosted fonts use CDN's to deliver the font to the browser and in general have better speed and availability than what we could achieve. | These third-party-hosted fonts use CDN's to deliver the font to the browser and in general have better speed and availability than what we could achieve. |

## Self Hosting and Custom Fonts

Sometimes our clients may have their own font for branding or other reasons. In these cases we can't resort to third party hosting.

In order to solve this issue we need to host the fonts ourselves by following these (high-level) steps

1. Obtain the font. This should be provided for you
2. Add the fonts to `src/assets/fonts/`
3. Load the fonts by defining the `@font-face` in `src/index.css`
4. Add the `font-family` in `src/design/theme/font-family.ts`. This will take care of setting the fort for the whole theme

### Example

#### Steps 1 and 2

The fort `Montserrat` is provided as an example in `src/examples/assets/fonts`

#### Step 3

Add the following to `src/index.css`

- `font-family`: the name used to target this font, same for all variants
- `src`: where is the font located in the dev environment
  - `url` this is self-explanatory
  - `format`: this varies depending on the file type
    | Extension | Format |
    | ------------------ | ------------------- |
    | `.eot` | - |
    | `.eot?#iefix` | `embedded-opentype` |
    | `.woff2` | `woff2` |
    | `.woff` | `woff` |
    | `.svg#svgFontName` | `svg` |
- `font-weight`: by default our theme uses `100`, `400` and `700` as the available weights, ideally we should provide the valiables for all these weights. If any is missing the closest one will be used.
- `font-style`: for those fonts that need italics or some other style we have to provide the variant as well. In the example bellow we only provide the italic style for the medium variant.

> Note that the `url` for all those font faces point ar `examples/assets/fonts/...`, yours should not, they should point at `assets/fonts/...`

```css
/* src/index.css */

@font-face {
  font-family: 'Montserrat';
  src: url('examples/assets/fonts/Montserrat-Thin.ttf') format('truetype');
  font-weight: 100;
  font-style: normal;
}

@font-face {
  font-family: 'Montserrat';
  src: url('examples/assets/fonts/Montserrat-Medium.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Montserrat';
  src: url('examples/assets/fonts/Montserrat-MediumItalic.ttf') format('truetype');
  font-weight: 400;
  font-style: italic;
}

@font-face {
  font-family: 'Montserrat';
  src: url('examples/assets/fonts/Montserrat-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}
```

#### Step 4

Open `src/design/theme/font-family.ts` and add the following

```typescript
// src/design/theme/font-family.ts

export const fontFamily = ['"Montserrat"', 'sans-serif'].join(',');
```

> Remember to remove the font <link> tags from `public/index.html`

With all this done the font should be loading on the custom elements and those of the design system in use.
