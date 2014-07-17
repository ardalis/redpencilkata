var assert = require("assert")
var redpencil = require("../redpencil.js");

describe('A product', function(){
  describe('when initially created', function(){
    var product = new redpencil.Product(1.0);
    it('should have a price of one', function() {
        assert.equal(1.0, product.price);
    });
    it('should have a name of "A product"', function() {
		assert.equal("A product", product.name);
    });
    it('should have a priceLastModified set to today', function() {
		assert.equal(new Date().toDateString(), product.priceLastModifiedDate.toDateString());
    });
    it('should have a redPencilStarted set to null', function() {
		assert.equal(null, product.redPencilStarted);
    });
    it('should have a redPencilInProgress set to false', function() {
		assert(!product.redPencilInProgress);
    });
  })
  describe('when updatePrice is called ', function(){
	var product = new redpencil.Product(1.0);
	product.updatePrice(1.23);
	it('should set the price to 1.23', function() {
		assert.equal(1.23, product.price);
	});
	it('should set priceLastModified', function() {
		assert(product.priceLastModifiedDate);
	});
	it('should not set redPencilStarted', function() {
		assert(!product.redPencilStartedDate);
	});
  })
  describe('when updatePrice is called and price is reduced 20% and price was stable for 31 days', function(){
	var product = new redpencil.Product(1.0);
	product.priceLastModifiedDate = new Date("2014-06-14");
	product.updatePrice(0.8);
	it('should set the price to 0.8', function() {
		assert.equal(0.8, product.price);
	});
	it('should set priceLastModified', function() {
		assert(product.priceLastModifiedDate);
	});
	it('should set redPencilStarted', function() {
		assert(product.redPencilStartedDate);
	});
	describe('when expirePromotion is called', function(){
		product.expirePromotionIfRequired();
		it('should not set redPencilInProgress to false', function(){
			assert(!product.redPencilInProgress);
		});
		it('should not set redPencilStartedDate to null', function(){
					assert(product.redPencilStartedDate);
});
	})
  })
  describe('days_since',function(){
	var product = new redpencil.Product();
	var day1 = new Date(2014, 7, 5);
	var day2 = new Date(2014, 7, 10);
	it('should return 5 days', function() {
		assert.equal(5, product.days_since(day1, day2));
	});
	it('should return 32 days between 16 July and 14 June', function() {
		assert.equal(32, product.days_since(new Date(2014,5,14), new Date(2014,6,16)));
	});
  })
  describe('percentInRange',function(){
	var product = new redpencil.Product();
	it('should return false given 4.9', function() {
		assert(!product.percentInRange(.049));
	});
	it('should return true given 5', function() {
		assert(product.percentInRange(.05));
	});
	it('should return true given 30', function() {
		assert(product.percentInRange(.3));
	});
	it('should return false given 30.1', function() {
		assert(!product.percentInRange(.301));
	});
  })
});
