export class Button{
    constructor(x,y,width,height,text, onClick){
        this.x = x;
        this.y = y;
        this.width = width; 
        this.height = height;
        this.text = text;
        this.onClick = onClick;
    }
    draw(ctx) {
        ctx.fillStyle = "#494d54";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }
    isInside(x, y) {
        return (
        x >= this.x &&
        x <= this.x + this.width &&
        y >= this.y &&
        y <= this.y + this.height
        );
    }

}