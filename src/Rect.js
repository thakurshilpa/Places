'use strict'

let Rect = function(topX, topY, bottomX, bottomY) {
    this.topX = topX;
    this.topY = topY;
    this.bottomX = bottomX;
    this.bottomY = bottomY;
    this.width = this.bottomX - this.topX;
    this.height = this.bottomY - this.topY;
    this.left = topX;
    this.right = bottomX;
    this.top = this.topY;
    this.bottom = this.bottomY;
}

Rect.prototype.getWidth = function(x, y) {
    return this.width;
}

Rect.prototype.getHeight = function(x, y) {
    return this.height;
}

Rect.prototype.hasPoint = function(x, y) {
    if(x < this.topX || x > this.bottomX) {
        return false;
    }

    if(y < this.topY || y > this.bottomY) {
        return false;
    }

    return true;
}

// Bit flawed, but works in our usecase
Rect.prototype.isLessThan = function(rect) {
    return this.width < rect.getWidth() && this.height < rect.getHeight(); 
}

Rect.prototype.rectNW = function() {
    return new Rect(this.topX, this.topY, this.topX + this.width/2, this.topY + this.height/2);
}

Rect.prototype.rectNE = function() {
    return new Rect(this.topX + this.width/2, this.topY, this.topX + this.width, this.topY + this.height/2);
}

Rect.prototype.rectSW = function() {
    return new Rect(this.topX, this.topY + this.height/2, this.topX + this.width/2, this.bottomY);
}

Rect.prototype.rectSE = function() {
    return new Rect(this.topX + this.width/2, this.topY + this.height/2, this.bottomX, this.bottomY);
}

Rect.prototype.intersect = function(r2) {
    let r1 = this;
    return !(r2.left > r1.right || 
        r2.right < r1.left || 
        r2.top > r1.bottom ||
        r2.bottom < r1.top);
}

module.exports = {
    Rect: Rect
};