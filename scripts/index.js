
//Elements
const tabs = document.querySelectorAll('.tab');
const projectTab = document.querySelector('.projects');
const tabTitle = document.querySelectorAll('.title');
const controlButtons = document.querySelectorAll('.controlButton');
const projects = document.querySelectorAll('.project');

//Functions
function toggleOpen(e) {
    const minActive = [...tabTitle].filter(title => [...title.classList].includes('min'));
    if ((minActive.length)  && ![...this.firstElementChild.classList].includes('min')){
        tabTitle.forEach(title => title.classList.remove('min'));
        setTimeout(() => {
            tabs.forEach(tab => tab.classList.remove('open'));
            this.classList.add('open');
        }, 500)
    } else {
        tabs.forEach(tab => tab.classList.remove('open'));
        this.classList.add('open');
    }
}

function colapseTitle(e) {
    if (e.propertyName.includes('flex') && [...this.classList].includes('open')) {
        this.firstElementChild.classList.add('min');        
    }
}

function navigateToSelectedProject(e) {
    projects.forEach(project => project.addEventListener('transitionend', (e) => {
        console.log('run');
        console.log(e.originalTarget);
        console.log(currentProject);
        if (e.originalTarget === currentProject) {
            switchToTargetProject(targetProject, direction);
        } else {
            console.log('should return');
            return;
        }
    }));
    const currentProject = [...projects].filter(project => [...project.classList].includes('displayed'))[0];
    const currentProjectNumber = Number(currentProject.classList[1].slice(-1));
    const currentProjectPositionMatrix = window.getComputedStyle(currentProject).getPropertyValue('transform');
    const currentProjectPosition = new WebKitCSSMatrix(currentProjectPositionMatrix).m41;
    const button = e.target.classList[1];
    let targetProject = {};
    let direction = '';
    if (button === 'controlButton--forward' && currentProjectNumber < projects.length) {
        direction = 'forward';
        targetProject = [...projects].filter(project => [...project.classList].includes(`project--${currentProjectNumber + 1}`))[0];
        const targetProjectNumber = Number(targetProject.classList[1].slice(-1));
        switchFromCurrentProject(currentProject, currentProjectNumber, currentProjectPosition, direction);
    }
    if (button === 'controlButton--back' && currentProjectNumber > 1) {
        direction = 'back';
        targetProject = [...projects].filter(project => [...project.classList].includes(`project--${currentProjectNumber - 1}`))[0];
        const targetProjectNumber = Number(targetProject.classList[1].slice(-1));
        switchFromCurrentProject(currentProject, currentProjectNumber, currentProjectPosition, direction);
    }
    if (!button.includes('forward') && !button.includes('back')) {
        console.log(currentProjectNumber);
        console.log(button);
    }
}



function switchFromCurrentProject(currentProject, currentProjectNumber, currentProjectPosition, direction) {
    console.log(currentProjectPosition);
    currentProject.style.transition = "transform 1s";
    if (direction === 'forward') {
        currentProject.style.transform = `translateX(calc(${currentProjectPosition}px - 100%))`;
        currentProject.classList.remove('displayed');
    }
    if (direction === 'back') {
        currentProject.style.transform = `translateX(calc(${currentProjectPosition}px + 100%))`;
        currentProject.classList.remove('displayed');
    }
}

function switchToTargetProject(targetProject, direction){
    const targetProjectNumber = Number(targetProject.classList[1].slice(-1));
    const targetProjectPositionMatrix = window.getComputedStyle(targetProject).getPropertyValue('transform');
    const targetProjectPosition = new WebKitCSSMatrix(targetProjectPositionMatrix).m41;
    targetProject.style.transition = "transform 1s";
    if (direction === 'forward') {
        targetProject.style.transform = `translateX(calc(${targetProjectPosition}px - 100%))`;
    }
    if (direction === 'back') {
        targetProject.style.transform = `translateX(calc(${targetProjectPosition}px + 100%))`;
    }
    targetProject.classList.add('displayed');
}



//Event Listeners
tabs.forEach(tab => tab.addEventListener('click', toggleOpen));
tabs.forEach(tab => tab.addEventListener('transitionend', colapseTitle));
controlButtons.forEach(button => button.addEventListener('click', navigateToSelectedProject));


