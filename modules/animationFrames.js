const ANIMATION_FRAMES = [];

for (let i = 0; i < 60; i++) ANIMATION_FRAMES.push(scale(0.995, 0.995, 0.995));
for (let i = 0; i < 90; i++) ANIMATION_FRAMES.push(rotateY(-1));
for (let i = 0; i < 90; i++) ANIMATION_FRAMES.push(rotateY(1));
for (let i = 0; i < 90; i++) ANIMATION_FRAMES.push(rotateY(1));
for (let i = 0; i < 90; i++) ANIMATION_FRAMES.push(rotateY(-1));
for (let i = 0; i < 60; i++) ANIMATION_FRAMES.push(scale(1.005, 1.005, 1.005));
for (let i = 0; i < 60; i++) ANIMATION_FRAMES.push(translate(0, -0.05, 0));

export default ANIMATION_FRAMES;
