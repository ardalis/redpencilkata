function Product(startingPrice) {
    this.price = startingPrice;
    this.name = "A product";
	this.priceLastModifiedDate = new Date();
	this.redPencilStartedDate = null;
	this.redPencilInProgress = false;
}
Product.prototype.updatePrice = function(newPrice) {
	var priceReductionPct = (this.price-newPrice)/this.price;
    this.price = newPrice;
	var daysPriceHasBeenStable = this.days_since(this.priceLastModifiedDate, new Date());
	console.log("PLM:" + this.priceLastModifiedDate + " - days: " + daysPriceHasBeenStable);
	if(daysPriceHasBeenStable >= 30){
		if(this.percentInRange(priceReductionPct)) {
			if(!this.redPencilInProgress)
			{
				this.redPencilStartedDate = new Date();
			}
		}
	}
	this.priceLastModifiedDate = new Date();
};

Product.prototype.expirePromotionIfRequired = function() {
	// turns off red pencil promotions if they've expired
	if(this.redPencilInProgress) {
		if(this.days_since(this.redPencilStartedDate, new Date()) > 30){
			this.turnOffRedPencil();
		}
	}
};

Product.prototype.turnOffRedPencil = function() {
	this.redPencilStartedDate = null;
	this.redPencilInProgress = false;
};

Product.prototype.percentInRange = function(percent) {
	return (percent >= .05 && percent <= .3);
}

Product.prototype.days_since = function(olderDate, laterDate) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var olderDate_ms = olderDate.getTime();
    var laterDate_ms = laterDate.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = laterDate_ms - olderDate_ms;

    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY);
}
module.exports.Product = Product;