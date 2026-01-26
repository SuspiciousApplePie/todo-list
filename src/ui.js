
export class NavBar {
    constructor(title) {
        this.title = title;
        this.main = document.querySelector(".main");
    }

    renderNavBar(names) {
        const nav = document.createElement("nav");
        nav.textContent = this.title;
        this.main.appendChild(nav);

        const ul = document.createElement("ul");

        names.forEach(name => {
            const li = document.createElement("li");
            li.textContent = name;
            ul.appendChild(li);
        });

        nav.appendChild(ul);
    }
}