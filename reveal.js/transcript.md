Hello, my name is Artem and today we gona talk about CSS Grid Layout. So, What is CSS
Grid layout?

CSS Grid Layout (aka "Grid"), is a two-dimensional grid-based layout system that aims to
do nothing less than completely change the way we design grid-based user interfaces. CSS
has always been used to lay out our web pages, but it's never done a very good job of
it. First, we used tables, then floats, positioning and inline-block, but all of these
methods were essentially hacks and left out a lot of important functionality (vertical
centering, for instance).

Flexbox helped out, but it's intended for simpler one-dimensional layouts, not complex
two-dimensional ones (Flexbox and Grid actually work very well together). Grid is the
very first CSS module created specifically to solve the layout problems we've all been
hacking our way around for as long as we've been making websites.

How to work with Grid?
To get started you have to define a container element as a grid with display: grid, set the column and row sizes with grid-template-columns and grid-template-rows, and then place its child elements into the grid with grid-column and grid-row. Similarly to flexbox, the source order of the grid items doesn't matter. Your CSS can place them in any order, which makes it super easy to rearrange your grid with media queries. Imagine defining the layout of your entire page, and then completely rearranging it to accommodate a different screen width all with only a couple lines of CSS. Grid is one of the most powerful CSS modules ever introduced.

Important Terminology

Before diving into the concepts of Grid it's important to understand the terminology. Since the terms involved here are all kinda conceptually similar, it's easy to confuse them with one another if you don't first memorize their meanings defined by the Grid specification. But don't worry, there aren't many of them.

Grid Container

The element on which display: grid is applied. It's the direct parent of all the grid items. In this example container is the grid container.

Grid Item

The children (i.e. direct descendants) of the grid container. Here the item elements are grid items, but sub-item isn't.

The dividing lines that make up the structure of the grid. They can be either vertical
("column grid lines") or horizontal ("row grid lines") and reside on either side of a
row or column. Here the yellow line is an example of a column grid line.

The space between two adjacent grid lines. You can think of them like the columns or
rows of the grid. Here's the grid track between the second and third row grid lines.

The space between two adjacent row and two adjacent column grid lines. It's a single
"unit" of the grid. Here's the grid cell between row grid lines 1 and 2, and column
grid lines 2 and 3.

The total space surrounded by four grid lines. A grid area may be comprised of any
number of grid cells. Here's the grid area between row grid lines 1 and 3, and column
grid lines 1 and 3.

How we already know, Grids have parents and children, so
it is logical that there are properties for both parents and children

Properties for the Grid Container

display
grid-template-columns
grid-template-rows
grid-template-areas
grid-template
grid-column-gap
grid-row-gap
grid-gap
justify-items
align-items
place-items
justify-content
align-content
place-content
grid-auto-columns
grid-auto-rows
grid-auto-flow
grid

Display property defines the element as a grid container and establishes a new grid formatting context for its contents.

grid-template-columns
grid-template-rows

Values:
_ track-size - can be a length, a percentage, or a fraction of the free space in the grid (using the fr unit)
_ line-name - an arbitrary name of your choosing

Example

When you leave an empty space between the track values, the grid lines are automatically assigned positive and negative numbers:

grid-template-areas
Defines a grid template by referencing the names of the grid areas which are specified with the grid-area property. Repeating the name of a grid area causes the content to span those cells. A period signifies an empty cell. The syntax itself provides a visualization of the structure of the grid.

Values:
_ grid-area-name - the name of a grid area specified with grid-area
_ . - an arbitrary name of your choosing \* none - no grid areas are defined

grid-template-areas

Defines a grid template by referencing the names of the grid areas which are specified with the grid-area property. Repeating the name of a grid area causes the content to span those cells. A period signifies an empty cell. The syntax itself provides a visualization of the structure of the grid.

Values:

- grid-area-name - the name of a grid area specified with grid-area
- . - an arbitrary name of your choosing
- none - no grid areas are defined

grid-template

A shorthand for setting grid-template-rows, grid-template-columns, and grid-template-areas in a single declaration.

Values:

- none - sets all three properties to their initial values
- grid-template-rows / grid-template-columns - sets grid-template-columns and grid-template-rows to the specified values, respectively, and sets grid-template-areas to none

grid-column-gap ### grid-row-gap
Specifies the size of the grid lines. You can think of it like setting the width of the gutters between the columns/rows.

Values:

- line-size - a length value

grid-gap

A shorthand for grid-row-gap and grid-column-gap

Values:

- grid-row-gap grid-column-gap - length values

justify-items

Aligns grid items along the inline (row) axis (as opposed to align-items which aligns along the block (column) axis). This value applies to all grid items inside the container.

Values:

- start - aligns items to be flush with the start edge of their cell
- end - aligns items to be flush with the end edge of their cells
- center - aligns items in the center of their cell
- stretch - fills the whole width of the cell (this is the default)

align-items

Aligns grid items along the inline (row) axis (as opposed to align-items which aligns along the block (column) axis). This value applies to all grid items inside the container.

Values:

- start - aligns items to be flush with the start edge of their cell
- end - aligns items to be flush with the end edge of their cells
- center - aligns items in the center of their cell
- stretch - fills the whole width of the cell (this is the default)

place-items

place-items sets both the align-items and justify-items properties in a single declaration.

Values:

- align-items / justify-items - The first value sets align-items, the second value justify-items. If the second value is omitted, the first value is assigned to both properties.
  All major browsers except Edge support the place-items shorthand property.

justify-content

Sometimes the total size of your grid might be less than the size of its grid container. This could happen if all of your grid items are sized with non-flexible units like px. In this case you can set the alignment of the grid within the grid container. This property aligns the grid along the inline (row) axis (as opposed to align-content which aligns the grid along the block (column) axis).

Values:

- start - aligns the grid to be flush with the start edge of the grid container
- end - aligns the grid to be flush with the end edge of the grid container
- center - aligns the grid in the center of the grid container
- stretch - resizes the grid items to allow the grid to fill the full width of the grid container
- space-around - places an even amount of space between each grid item, with half-sized spaces on the far ends
- space-between - places an even amount of space between each grid item, with no space at the far ends
- space-evenly - places an even amount of space between each grid item, including the far ends

align-content

Sometimes the total size of your grid might be less than the size of its grid container. This could happen if all of your grid items are sized with non-flexible units like px. In this case you can set the alignment of the grid within the grid container. This property aligns the grid along the block (column) axis (as opposed to justify-content which aligns the grid along the inline (row) axis).

Values:

- start - aligns the grid to be flush with the start edge of the grid container
- end - aligns the grid to be flush with the end edge of the grid container
- center - aligns the grid in the center of the grid container
- stretch - resizes the grid items to allow the grid to fill the full height of the grid container
- space-around - places an even amount of space between each grid item, with half-sized spaces on the far ends
- space-between - places an even amount of space between each grid item, with no space at the far ends
- space-evenly - places an even amount of space between each grid item, including the far ends

grid-auto-columns
grid-auto-rows

Specifies the size of any auto-generated grid tracks (aka implicit grid tracks). Implicit tracks get created when there are more grid items than cells in the grid or when a grid item is placed outside of the explicit grid.

Values:

- track-size - can be a length, a percentage, or a fraction of the free space in the grid (using the fr unit)

grid
A shorthand for setting all of the following properties in a single declaration: grid-template-rows, grid-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns, and grid-auto-flow.

The following two code blocks are equivalent:

grid-column-start, grid-column-end, grid-row-start,  
grid-row-end

Determines a grid item's location within the grid by referring to specific grid lines. grid-column-start/grid-row-start is the line where the item begins, and grid-column-end/grid-row-end is the line where the item ends.

Values:

- line - can be a number to refer to a numbered grid line, or a name to refer to a named grid line
- span number - the item will span across the provided number of grid tracks
- span name - the item will span across until it hits the next line with the provided name
- auto - indicates auto-placement, an automatic span, or a default span of one

grid-column
grid-row

Shorthand for grid-column-start + grid-column-end, and grid-row-start + grid-row-end, respectively.
Values:

- start-line / end-line - each one accepts all the same values as the longhand version, including span

grid-area

Gives an item a name so that it can be referenced by a template created with the grid-template-areas property. Alternatively, this property can be used as an even shorter shorthand for grid-row-start + grid-column-start + grid-row-end + grid-column-end.

Values:

- name - a name of your choosing
- row-start / column-start / row-end / column-end - can be numbers or named lines

justify-self
Aligns a grid item inside a cell along the inline (row) axis (as opposed to align-self which aligns along the block (column) axis). This value applies to a grid item inside a single cell.

Values:

- start - aligns the grid item to be flush with the start edge of the cell
- end - aligns the grid item to be flush with the end edge of the cell
- center - aligns the grid item in the center of the cell
- stretch - fills the whole width of the cell (this is the default)

align-self
Aligns a grid item inside a cell along the block (column) axis (as opposed to justify-self which aligns along the inline (row) axis). This value applies to the content inside a single grid item.
Values:

\*start - aligns the grid item to be flush with the start edge of the cell

- end - aligns the grid item to be flush with the end edge of the cell
- center - aligns the grid item in the center of the cell
- stretch - fills the whole height of the cell (this is the default)

place-self

place-self sets both the align-self and justify-self properties in a single declaration.:
auto - The “default” alignment for the layout mode.
align-self / justify-self - The first value sets align-self, the second value justify-self. If the second value is omitted, the first value is assigned to both properties.

Today we talked about CSS Grid Layout. More information u can find in
unlimited source of knowledge namely the internet. Thank u for attention. Bye!
