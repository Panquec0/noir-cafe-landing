const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

if (cursor && follower) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  cursor.style.left = `${mouseX}px`;
  cursor.style.top = `${mouseY}px`;
  follower.style.left = `${followerX}px`;
  follower.style.top = `${followerY}px`;

  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(animateFollower);
  }

  animateFollower();

  const interactives = document.querySelectorAll(
    'a, button, input, textarea, select, label, .tab, .menu-card, .nav__toggle, *[role="button"]'
  );

  interactives.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });

    element.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.add('cursor-hover');
  });

  document.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-hover');
  });
}