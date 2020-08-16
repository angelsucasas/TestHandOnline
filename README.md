# TestHandOnline ![npm](https://img.shields.io/badge/HTML-v.5-reed) ![npm](https://img.shields.io/badge/CSS-v-purple) ![npm](https://img.shields.io/badge/JS-v-orange) ![npm](https://img.shields.io/badge/Bootstrap-v.3.3-purple)
An online aplication to test hands  of a Yu-Gi-Oh! deck to see the consistency of combos and the viability of it.


## How to test it?

JUst clone the repository with 

```bash
$ git clone  
```
or via zip.

then just open the welcome.html file, and you are ready to go.

## How to use it?

there are 3 steps to get the results.

### step 1: upload the .ydk files

### What is a .YDK file?

its a file generated only by : Dueling Book, dueling Nexus and YgoPro. It contains all the info of your cards in the main, side and extra deck. 
it is use here to make more easy the process of getting all the information of your cards.

### step 2: select the cards that take part of the combo you want to register.

In this step, your main deck and extra deck will be show, you can drag the cards that you want to the boxes in you right, those cards will be register as a "combo",
that means that in every hand that the pages generates to test the consistency of that combo, it is going to search that specific combination of card in that hand.

so lets say i have this ciberse deck:

![image](https://user-images.githubusercontent.com/44983658/90335524-96bf3c80-dfa3-11ea-9f67-b7053d585cdf.png)

if i wanted to see how many times i started with this particular card, i would just drag it and drop it on the box on the right, and it would look like this:

![image](https://user-images.githubusercontent.com/44983658/90335699-c9b60000-dfa4-11ea-8f93-8c24735a65ba.png)

then what? you need to indicate how many hands do you want to test here:

![image](https://user-images.githubusercontent.com/44983658/90335724-f407bd80-dfa4-11ea-9cf5-1af7a3fb169b.png)

and then you just click the blue button.

### Step 3: results

![image](https://user-images.githubusercontent.com/44983658/90335724-f407bd80-dfa4-11ea-9cf5-1af7a3fb169b.png)

and there you go, you can go back in steps and add cards to the combo , or more combos.

## Deploy

You can se the page running here:

https://testhandonline.000webhostapp.com/

## BETA 1.0

"Al principio hice la pagina en laravel, pero el espacio que proporcionaba el servidor era muy limitado, 
y la carpeta de imagenes de las cartas + la carpeta de node_modules ocupaban mucho espacio y no iban a permitir desplegar la pagina
Entoces, tuve que pasar toda la logica a JS..."
