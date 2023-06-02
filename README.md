## See the outcome
[Link to published version on Chromatic](https://main--6467820305f602a876c3512e.chromatic.com/?path=/story/theme--page)

## Project goals
- Try out TypeScript, CSS-in-JS (styled-components), Next and Storybook
- Create a wider range of web components, some of which hadn't cropped up in my previous projects
- Practice a form of TDD
- Take accessibility into consideration
- Implement someone else's designs  

## How I worked on this project
I aimed to simulate a more professional workflow.
- Worked based on a UI kit design from a Figma file: [link to Figma file](https://www.figma.com/community/file/817436609226882468)
- Created feature branches and submitted pull requests
- Began work on each component by writing stories corresponding to each version / state in the Figma file. With these "tests" in place, I started to write the actual component
- Used [Perfect Pixel add-on](https://www.welldonecode.com/perfectpixel/) to compare story output to the Figma file  

## How to navigate this project
- Responsive CSS in styled-components: [code](https://github.com/Alex-Symonds/uikit-2022-00/blob/5633b525cb8bfe43e5cdef979dbb7bfe25deec24/components/Island.tsx#L81), [desktop story link](http://localhost:6006/?path=/story/ui-kit-island--default), [mobile story link](https://main--6467820305f602a876c3512e.chromatic.com/?path=/story/ui-kit-island--responsive)
- Accessibile context menu with button access: [code](https://github.com/Alex-Symonds/uikit-2022-00/blob/main/components/contextMenu/ContextMenu.tsx), [story link](https://main--6467820305f602a876c3512e.chromatic.com/?path=/story/ui-kit-contextmenu--right-click-radio)
- Story written in CSF2 -- Component Story Format 2 -- syntax, including multiple pseudo-states (sometimes requires a page refresh): [code](https://github.com/Alex-Symonds/uikit-2022-00/blob/main/components/Button.stories.tsx), [story link](https://main--6467820305f602a876c3512e.chromatic.com/?path=/story/ui-kit-button--primary)
- Story written in the newer CSF3 syntax: [code](https://github.com/Alex-Symonds/uikit-2022-00/blob/main/components/tooltip/Tooltip.stories.tsx), [story link](https://main--6467820305f602a876c3512e.chromatic.com/?path=/story/ui-kit-tooltip--default-functional)

## Why I built the project this way
- TypeScript and Next seemed popular choices with React, so I wanted to give them a try
- Having previously worked with plain CSS, Bootstrap and SCSS, I wanted to expand my CSS repertoire by trying out CSS-in-JS. styled-components seemed like the go-to choice for React
- In the past I've sometimes wanted to write a test to check if something on the front-end "looks right", but I had no idea how to express that in the form of an assertion. Storybook, Chromatic and GitHub Actions enable that sort of testing
- I'm aware that many companies work based on component libraries and so thought that attempting to create one would be good practice

## Deviations from the Figma file
- The design for the context menu lacked a button to enable access via keyboard or touchscreen, so I made up my own
- The "focus active" design for Select relies heavily upon an open list of options, leaving no visual indication of focus if the user closes the options list. To rectify this while preserving the design choices in the Figma file, I added a focus outline which is only displayed when the options list is closed
- The design for "Input Tag" included a design for "filled", but not for "overfilled". I decided to add a styled horizontal scrollbar
- Select Tag /did/ have a design for "overfilled", in which overflowing tags are cut-off and hidden. Since I'd already worked out a scrollbar for Input Tag, I decided to add this functionality to Select Tags as well (I thought it'd be more convenient for users than needing to always open the options list to review choices)
- The Figma file's Avatar design incorporates images I recognised as iOS emojis. I considered whether my component should display emojis (which would look different on a different OS) or if I should display the actual images (ensuring a consistent look across all platforms). Displaying the actual images would require me to source suitable image files and check the copyright/licensing for each one, so I decided to stick with system-specific emojis to save time (even though the iOS lion is really cute)

## Interesting challenges
- Diagnosing the cause of a bug: the File Uploader was flickering during drag-and-drop.
    - A similar bug is caused by dragging over a child element causing an undesirable dragLeave event on the parent, but implementing suggested fixes did not clear the error
    - I eventually worked out that my flickering was *also* caused by the design for the default component being 10px taller than the design for the drag component, which had created a no-man's-land
- Responsiveness: the tooltip required a slightly more elaborate setup for responsiveness. While the top priority was for Tooltips to always fit on screen, I *also* wanted the arrow to either point at the target or disappear. Additionally, since the user could select a bubble and placement, I wanted to respect their choice as closely as possible.
    - I set up the positioning component to check if the user's pick will fit on screen.
    - If not, it sorts the other bubble-and-placement combinations based on closeness to the selection, then (without re-rendering) tries each one in turn until it finds one that would fit
    - If none would fit, it gives up on the arrow and displays an arrow-less bubble at the top of the screen

## If I had more time
- Create some pages using the components, possibly replicating the "examples" pages from the Figma file
- Add support for using image files on some components. (Some of the "examples" in the Figma file includes photos applied to what appears to be Avatar and a modified version of Island)
- Add support for applying grid and flex properties directly to components, rather than needing to add a wrapper element for positioning
- Add optional properties covering all standard HTML attributes for the "lower level" components, such as Button

## Running the Project
1. `git clone --recursive https://github.com/Alex-Symonds/uikit-2022-00.git`
2. Navigate inside the folder
3. `npm install`
4. `npm run storybook`

Once Storybook setup is complete, links for the correct port on localhost and your IP will appear in the CLI.