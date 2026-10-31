(function(){
  function pills(id,a){var h=a.map(function(x){return '<span class="chip">'+x+'</span>'}).join('');document.getElementById(id).innerHTML=h+h}
  pills("m1",["Python","Java","HTML","CSS","MySQL","NumPy","Pandas","Matplotlib","Scikit-learn","Flask"]);
  pills("m2",["Git","GitHub","VS Code","Tableau","Data Analysis","Machine Learning","Recommendation Systems","Data Visualization","EDA"]);
  pills("m3",["Tata GenAI Data Analytics (Forage)","Daikibo Telemetry Task (Forage)","Data Science Internship, Apponix"]);
  var n=0,pc=document.getElementById("pc"),pb=document.getElementById("pb"),ld=document.getElementById("ld");
  var iv=setInterval(function(){n+=Math.ceil(Math.random()*6);if(n>=100){n=100;clearInterval(iv);setTimeout(function(){ld.classList.add("out")},450)}pc.textContent=n+"%";pb.style.width=n+"%"},40);
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add("in")})},{threshold:.12});
  document.querySelectorAll(".rv").forEach(function(e){io.observe(e)});
  var home=document.getElementById("home"),img=document.getElementById("pimg"),ws=document.querySelectorAll(".hl h1"),hp=document.getElementById("hp");
  var sub=["Available for hire. Building data-driven applications using Python, Pandas & Flask.","Clean code, REST-style Flask apps and MySQL-backed data products.","Recommendation systems, predictive models and dashboards that scale from notebook to app."];
  var cur=0;
  function sc(){
    var r=home.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));
    img.style.transform="rotateY("+((0.5-p)*60).toFixed(1)+"deg) scale("+(1+p*.12).toFixed(3)+")";
    var k=p<.34?0:p<.67?1:2;
    if(k!==cur){ws[cur].classList.remove("on");ws[k].classList.add("on");hp.textContent=sub[k];cur=k}
  }
  addEventListener("scroll",sc,{passive:true});sc();
})();

// ===== 3D PARTICLE MOTION SPHERE =====

(() => {
    const canvas = document.getElementById("particleSphere");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = 650;
    const points = [];

    let width = 0;
    let height = 0;
    let rotation = 0;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    // Create 650 spherical particles
    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;

        points.push({
            x: Math.cos(theta) * radius,
            y: y,
            z: Math.sin(theta) * radius
        });
    }

    // Adjust canvas size
    function resize() {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        width = rect.width;
        height = rect.height;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Mouse interaction
    canvas.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect();

        targetX =
            ((event.clientX - rect.left) / rect.width - 0.5) * 0.6;

        targetY =
            ((event.clientY - rect.top) / rect.height - 0.5) * 0.6;
    });

    canvas.addEventListener("mouseleave", () => {
        targetX = 0;
        targetY = 0;
    });

    // Animation
    function animate() {
        ctx.clearRect(0, 0, width, height);

        mouseX += (targetX - mouseX) * 0.035;
        mouseY += (targetY - mouseY) * 0.035;

        rotation += 0.003;

        const sphereRadius = Math.min(width, height) * 0.43;
        const centerX = width / 2;
        const centerY = height / 2;

        const cosY = Math.cos(rotation + mouseX);
        const sinY = Math.sin(rotation + mouseX);

        const cosX = Math.cos(mouseY);
        const sinX = Math.sin(mouseY);

        const projected = points.map((point) => {
            const x1 = point.x * cosY - point.z * sinY;
            const z1 = point.x * sinY + point.z * cosY;

            const y2 = point.y * cosX - z1 * sinX;
            const z2 = point.y * sinX + z1 * cosX;

            const perspective = 2.8 / (2.8 - z2 * 0.45);

            return {
                x: centerX + x1 * sphereRadius * perspective,
                y: centerY + y2 * sphereRadius * perspective,
                z: z2,
                scale: perspective
            };
        });

        // Draw distant particles first
        projected.sort((a, b) => a.z - b.z);

        projected.forEach((point) => {
            const depth = (point.z + 1) / 2;
            const size = (1.5 + depth * 2.1) * point.scale;
            const opacity = 0.35 + depth * 0.65;

            const gradient = ctx.createRadialGradient(
                point.x - size * 0.35,
                point.y - size * 0.4,
                0,
                point.x,
                point.y,
                size * 1.5
            );

            gradient.addColorStop(0, "#ffffff");
            gradient.addColorStop(0.35, "#b9d5ff");
            gradient.addColorStop(1, "#385baf");

            ctx.beginPath();
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2);

            ctx.fillStyle = gradient;
            ctx.globalAlpha = opacity;
            ctx.shadowBlur = depth > 0.65 ? 9 : 3;
            ctx.shadowColor = "#709dff";

            ctx.fill();
        });

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        requestAnimationFrame(animate);
    }

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    window.addEventListener("resize", resize);

    animate();
})();

