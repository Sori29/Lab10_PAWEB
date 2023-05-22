class ViewModel {
  #navMenu = this.#dom(`#nav-menu`);
  #main = this.#dom(`main`);
  #heroName = this.#dom(`#hero-name`);
  #heroTeam = this.#dom(`#hero-team`);
  #heroLevelJunior = this.#dom(`#hero-level-junior`);
  #heroLevelMiddle = this.#dom(`#hero-level-middle`);
  #heroLevelSenior = this.#dom(`#hero-level-senior`);
  #heroes = this.#dom(`#all-heroes tbody`);
  #numberOfHeroes = this.#dom(`#number-of-heroes`);
  #createButton = this.#dom(`#action-create`);
  #updateButton = this.#dom(`#action-update`);
  #deleteButton = this.#dom(`#action-delete`);
  constructor() {
    this.startViewLogic();
    this.initView();
  }
  startViewLogic() {
    this.#navMenu.addEventListener(`click`, (event) => {
      const navItemValue = event.target.value;
      this.selectedNavItem = navItemValue;
    });
    this.#heroes.addEventListener(`click`, (event) => {
      const heroName = event.target.parentElement.firstElementChild.innerText;
      this.selectedHero = heroName;
      if (this.selectedHero.name === heroName) {
        this.hero = this.selectedHero;
        this.updateButtonEnabled = true;
        this.deleteButtonEnabled = true;
      }
    });
  }
  initView() {
    this.selectedNavItem = `heroes`;
    this.updateButtonEnabled = false;
    this.deleteButtonEnabled = false;
  }
  set selectedNavItem(navItemValue) {
    for (const navItem of this.#navMenu.children) {
      if (navItem.firstElementChild.value === navItemValue) {
        navItem.firstElementChild.setAttribute(`data-selected`, ``);
      } else {
        navItem.firstElementChild.removeAttribute(`data-selected`);
      }
    }
    this.selectedSection = navItemValue;
  }
  set selectedSection(navItemValue) {
    for (const section of this.#main.children) {
      if (section.id.includes(navItemValue)) {
        section.setAttribute(`data-selected`, ``);
      } else {
        section.removeAttribute(`data-selected`);
      }
    }
  }
  get hero() {
    const name = this.#heroName.innerText;
    const team = this.#heroTeam.innerText;
    const level = this.getHeroLevel();
    return {name, team, level};
  }
  set hero(hero) {
    this.#heroName.value = hero.name;
    this.#heroTeam.value = hero.team;
    this.setHeroLevel(hero.level);
  }
  setHeroLevel(level) {
    if (level === "Junior") {
      this.#heroLevelJunior.checked = true;
    } else if (level === "Middle") {
      this.#heroLevelMiddle.checked = true;
    } else if (level === "Senior") {
      this.#heroLevelSenior.checked = true;
    }
  }
  get heroes() {
    const heroes = [];
    const rows = this.#heroes.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      const name = row.children[0].innerText;
      const team = row.children[1].innerText;
      const level = row.children[2].innerText;
      heroes.push({name, team, level});
    });
    return heroes;
  }
  set heroes(heroesValues) {
    while (this.#heroes.firstChild) {
      this.#heroes.removeChild(this.#heroes.firstChild);
    }
    heroesValues.forEach((heroValues) => {
      const hero = document.createElement(`tr`);
      hero.innerHTML = `<td>${heroValues.name}</td><td>${heroValues.team}</td><td>${heroValues.level}</td>`;
      this.#heroes.appendChild(hero);
    });
    this.#numberOfHeroes.innerText = heroesValues.length;
  }
  get selectedHero() {
    for (const hero of this.#heroes.children) {
      if (hero.hasAttribute(`data-selected`)) {
        const name = hero.children[0].innerText;
        const team = hero.children[1].innerText;
        const level = hero.children[2].innerText;
        return {name, team, level};
      }
    }
    return null;
  }
  set selectedHero(heroName) {
    for (const hero of this.#heroes.children) {
      if (hero.firstElementChild.innerText === heroName) {
        hero.setAttribute(`data-selected`, ``);
      } else {
        hero.removeAttribute(`data-selected`);
      }
    }
  }
  set updateButtonEnabled(value) {
    this.#updateButton.disabled = !value;
  }
  set deleteButtonEnabled(value) {
    this.#deleteButton.disabled = !value;
  }
  #dom(selector) {
    return document.querySelector(selector);
  }
}
