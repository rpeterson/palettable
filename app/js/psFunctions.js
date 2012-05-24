background(255);
size(300, 300); 

color black = color(0, 0, 0);       //black
color white = color(255, 255, 255); //white

void getPalette(r, g, b, x, y, w, h){

  color base = color(r, g, b);

  color shade1= lerpColor(base, black, .25);
  color shade2= lerpColor(base, black, .50);
  color shade3= lerpColor(base, black, .75);

  color tint1= lerpColor(base, white, .25);
  color tint2= lerpColor(base, white, .50);
  color tint3= lerpColor(base, white, .75);

  // Create Swatch
  fill(shade3);
  rect(x, y, w, h);

  fill(shade2);
  rect(x + w, y, w, h);

  fill(shade1);
  rect(x + (w * 2), y, w, h);

  fill(base);
  rect(x + (w * 3), y, w, h);

  fill(tint1);
  rect(x + (w * 4), y, w, h);

  fill(tint2);
  rect(x + (w * 5), y, w, h);

  fill(tint3);
  rect(x + (w * 6), y, w, h);
}

//Get Green Color
getPalette(43, 132, 132, 10, 10, 20, 100);

//Get Blue Color
getPalette(41, 108, 183, 10, 120, 20, 100);
