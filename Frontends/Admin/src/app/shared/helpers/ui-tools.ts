import { hasValue } from './checks';

/**
 * 
 * @param theme The class name of the theme to apply to the DOM
 * @description Stores theme class name in local storage as key value pair: 'theme':<theme_name>, additionally removes the current theme class from the DOM and adds the new one.
 */
export function setTheme(theme: string): void {
    let currentTheme = localStorage.getItem('theme');

    if (hasValue(currentTheme) && typeof currentTheme === 'string') {
        document.body.classList.remove(currentTheme);
    }

    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
}

/**
 * 
 * @returns String || null
 * @description String value of the theme class name attached to the DOM is returned. If no theme is set, null will be returned
 */
export function getTheme(): string | null {
    let currentTheme = localStorage.getItem('theme');

    if (hasValue(currentTheme)) {
        return currentTheme;
    } else {
        return null;
    }
}

export function toggleTheme(): void {
    let themeClasses = ['light-mode', 'dark-mode'];

    let newIndex = 0;

    let currentTheme = getTheme();

    if (currentTheme) {
        let idx = themeClasses.indexOf(currentTheme);

        if (idx === themeClasses.length - 1) {
            newIndex = 0;
        } else {
            newIndex = idx + 1;
        }
    }

    setTheme(themeClasses[newIndex]);

    window.location.reload();
}

export function initTheme(): void {
    let savedTheme = getTheme();

    if (savedTheme) {
        if (savedTheme === 'dark-mode' || savedTheme === 'light-mode') {
            setTheme(savedTheme);
        } else {
            setTheme('light-mode');
        }

    } else {
        setTheme('dark-mode');
    }
}

/**
 * @returns Void
 * @description This functions toggles the sidebar by either adding or removing the classed 'open' from the sidebar div element
 */
export function toggleSidebar(): void {
    const sidebarElement = document.querySelector('.app-container');
    if (sidebarElement) {
        sidebarElement.classList.toggle('open');
    }
}

export function setSidebarClosed(): void {
    const sidebarElement = document.querySelector('.app-container');
    if (sidebarElement) {
        sidebarElement.classList.remove('open');
    }
}

export function setSidebarOpend(): void {
    const sidebarElement = document.querySelector('.app-container');
    if (sidebarElement) {
        sidebarElement.classList.add('open');
    }
}