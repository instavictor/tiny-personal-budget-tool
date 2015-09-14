## Problem

Since graduating college nearly a decade ago, I've been keeping track of how much money I'm wasting monthly by downloading my credit card statements and allocating each purchase into a particular category e.g.
- eating out for dinner
- gas
- rent
- etc

The credit card statements are exported as CSVs and then opened in Excel.  I then copy the columns (store/retailer column + price column) into a text editor such as Notepad (Windows) or TextEdit (Mac).  After, I cut/copy/paste stuff around until they are grouped together into the above categories.  I input each purchase into my trusty calculator (in whatever native OS) and then out comes the total.

## Solution

Paste Excel columns into this app.  Color code (or categorize selections).  Outputs are total $ spent for each category.

Time wasted per year doing old way: 8+ hours  
Expected time wasted per year doing new way:  < 1 hour + learning Facebook React (for Views), ESLint, Windows 10, Gulp

## Dependencies

npm install -g react-tools

Sublime Linter  
Sublime Linter JSCS  
Sublime Linter ESLint

## Simple HTTP Server (required for Facebook React)

python -m http.server `<port>`
