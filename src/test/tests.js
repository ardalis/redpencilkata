var assert = require("assert")
var conway = require("../redpencil.js");

describe('A grid', function(){
  describe('when initially created', function(){
    var grid = new conway.Grid();
    it('should have 100 rows', function() {
        assert.equal(100, grid.rows.length);
    });
    it('should have 100 cells per row', function() {
        grid.rows.forEach(function(row) {
            assert.equal(100, row.length);
        });
    });
  })
  describe('after setting three neighbors alive', function() {
    var grid;
    var top = 2;
    var left = 1;
    beforeEach(function() {
        grid = new conway.Grid(5);
        grid.rows[top + 0][left + 1].isAlive = true;
        grid.rows[top + 1][left + 1].isAlive = true;
        grid.rows[top + 1][left + 0].isAlive = true;
        grid.nextGeneration();
    });
    it('should be set to alive', function() {
        assert(grid.rows[top][left].isAlive);
    });
    it('should remain alive after another generation', function() {
        grid.nextGeneration();
        assert(grid.rows[top][left].isAlive);
    });
    it('should die when a fourth neighbor is alive', function() {
        grid.rows[top][left - 1].isAlive = true;
        grid.nextGeneration();

        assert(!grid.rows[top][left].isAlive);
    });
  });
});