function RedZone(x, y, r, time) {
	this.pos = v(x, y);
	this.fakepos = v(0, 0);
	this.radius = r;
	this.ep = [];

	this.time = time;
	this.startTime = mil;
	this.preDrop = mil;

	this.redRange = [120, 255];
	this.redValue = random(120, 255);
	this.grow = (this.redRange[1] - this.redRange[0]) / 50;

	this.dropBoom = function() {
		if (mil - this.preDrop > 1000 / (this.radius / 100)) {
			this.preDrop = mil;
			var len = v(random(-1, 1), random(-1, 1)).setMag(random(this.radius));
			var pos = p5.Vector.add(this.pos, len);
			this.ep.push(new ExplorePoint(pos.x, pos.y, random(10, 20), [255, 255, 0], random(500, 2000)));
			if (random(1) > 0.5)
				iArr.push(new Item(pos.x, pos.y));
			else if(random(1) > 0.9)
				bArr.push(new Bullet(pos, v(0, 0), bulletTypes.Mine));
		}
	}

	this.show = function() {
		this.redValue += this.grow;
		if (this.redValue <= this.redRange[0] || this.redValue >= this.redRange[1])
			this.grow *= -1;

		if (insideViewport(this)) {
			this.fakepos = realToFake(this.pos.x, this.pos.y);

			noStroke();
			fill(this.redValue, 10, 10, 35);
			ellipse(this.fakepos.x, this.fakepos.y, this.radius * 2, this.radius * 2);

			for (var i = this.ep.length - 1; i >= 0; i--) {
				this.ep[i].show();
			}
		};

		for (var i = this.ep.length - 1; i >= 0; i--) {
			this.ep[i].checkExplore(this.ep);
		}

		if (mil - this.startTime > this.time) {
			redArr.splice(redArr.indexOf(this), 1);

		} else {
			this.dropBoom();
		}
	}
}