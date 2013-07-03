/**
 * From 西瓜宝宝网
 * http://xiguabaobao.com
 * Created with JetBrains WebStorm at 13-5-24
 *
 * Copyright 2013, Jason Xiang
 * info@xiguabaobao.com
 *
 */

var Ball = function() {
    this.Ball.apply(this, arguments);
};

iio.inherit(Ball, iio.ioCircle);
Ball.prototype._super = iio.ioCircle.prototype;
Ball.prototype.Ball = function(r, startPos, color, floor) {
    this._super.ioCircle.call(this, startPos, r);
    this.setFillStyle(color)
        .enableKinematics()
        .setAcc(0, 0.1)
        .setBound('bottom', floor, function(ball) {
            ball.vel.y *= -(0.8 + (ball.radius / 300));

            if(ball.pos.y > floor-ball.radius) {
                ball.pos.y = floor-ball.radius;
            }
            if(ball.vel.y > 0) {
                ball.vel.y = 0;
            } else if(-ball.vel.y < ball.acc.y) {
                ball.acc.y = -ball.vel.y;
                if(ball.acc.y < 0.00001) {
                    if(!ball.isRemoving) {
                        setTimeout(function() {
                            io.rmvObj(ball);
                        }, 3000);

                        ball.isRemoving = true;
                    }
                }
            }

            return true;
        });

    this.startPos = startPos;
    this.color = color;
    this.isRemoving = false;
};
Ball.prototype.clone = function() {
    return new Ball(this.radius, this.startPos, this.color);
};

var BallDown = function(io) {
    function randomColor() {
        var color = '#';
        for(var i = 0; i < 6; i++) {
            color += iio.getRandomInt(1, 16).toString(16);
        }
        return color;
    }

    window.addEventListener('mouseup', function(event) {
        var point = new iio.ioVec(event.x, event.y);
        if(event.button != 2) {
            var ball = new Ball(iio.getRandomInt(10, 30), point, randomColor(), io.canvas.height-40);
            //ball(radius, startPos, color, height)
            io.addToGroup('balls', ball);
        } else {
            var balls = io.getGroup('balls');
            for(var i = 0; i < balls.length; i++) {
                if(balls[i].contains(point)) {
                    io.rmvObj(balls[i]);
                }
            }
        }
    });

    io.addObj(new iio.ioText('', io.canvas.center)
        .setFont('30px Microsoft Yahei')
        .setFillStyle('black')
        .setTextAlign('center'));

    io.setFramerate(60);
};