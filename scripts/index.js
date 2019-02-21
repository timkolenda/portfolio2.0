
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
        // console.log(e);
        this.firstElementChild.classList.add('min');        
    }
}

function navigateToSelectedProject(e) {
    const currentProject = [...projects].filter(project => [...project.classList].includes('displayed'))[0];
    let currentProjectNumber = Number(currentProject.classList[1].slice(-1));
    // console.log('ntsp', currentProjectNumber);
    let button = e.target.classList[1];
    let targetProject = {};
    if (button === 'controlButton--forward' && currentProjectNumber < projects.length) {
        targetProject = [...projects].filter(project => [...project.classList].includes(`project--${currentProjectNumber + 1}`))[0];
        console.log(targetProject);
        switchProject(currentProject, currentProjectNumber, targetProject);
    }
    if (button === 'controlButton--back' && currentProjectNumber > 1) {
        targetProject = [...projects].filter(project => [...project.classList].includes(`project--${currentProjectNumber - 1}`))[0];
        switchProject(currentProject, currentProjectNumber, targetProject);
    }
    if (!button.includes('forward') && !button.includes('back')) {
        console.log(currentProjectNumber);
        console.log(button);
    }
    // switchProject(currentProject, currentProjectNumber, targetProject);
    
}

function switchProject(currentProject, currentProjectNumber, targetProject) {
    const targetProjectNumber = Number(targetProject.classList[1].slice(-1));
    if (currentProjectNumber < targetProjectNumber) {
        currentProject.classList.remove('displayed');
        currentProject.classList.add('hideOnLeft');
        targetProject.classList.remove('hideOnRight');
        targetProject.classList.add('displayed');
    }
    if (currentProjectNumber > targetProjectNumber) {
        currentProject.classList.remove('displayed');
        currentProject.classList.add('hideOnRight');
        targetProject.classList.remove('hideOnLeft');
        targetProject.classList.add('displayed');
    }
}




//Event Listeners
tabs.forEach(tab => tab.addEventListener('click', toggleOpen));
tabs.forEach(tab => tab.addEventListener('transitionend', colapseTitle));
controlButtons.forEach(button => button.addEventListener('click', navigateToSelectedProject));

