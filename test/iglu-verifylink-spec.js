var assert = require('assert'),
    webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    makeSuite = require('../util/helpers').makeSuite;

makeSuite('Check Menu Site', function() {

  it('should not error', function(done) {
    driver.controlFlow().on('uncaughtException', function(err) {
        console.log('There was an uncaught exception: ' + err);
    });

    driver.get("https://www.google.co.th/");
    driver.sleep(2000);
    driver.findElement(By.id("lst-ib")).clear();
    driver.findElement(By.id("lst-ib")).sendKeys("longdreamjourney");
    driver.findElement(By.id("lst-ib")).sendKeys("\uE007");
    driver.sleep(2000);
    driver.findElement(By.linkText("LongDreamJourney – java")).click();
    driver.sleep(2000);
    driver.getTitle().then(function (title) {
      assert.equal(title,'LongDreamJourney – java');
      done();
    });
  });

});
