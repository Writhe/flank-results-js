import { IResultGroup } from 'types/index';
import { createElement } from './helpers';

import './styles.scss';

const chevron = '<svg><use xlink:href="#icon-chevron"></use></svg>';

function handleGroupClick(ev: MouseEvent) {
  ev.preventDefault();

  const target = ev.currentTarget as HTMLDivElement;

  target.parentElement!.classList.toggle('isOpen');
}

class ResultList {
  results: IResultGroup[];
  node: Node;

  constructor(results: IResultGroup[]) {
    this.results = results;

    this.node = document.createElement('ul');

    results.forEach((group) => {
      const groupLabel = createElement(
        'a',
        `${chevron}<span>${group.label} (${group.items.length})</span>`,
        { href: '#' },
        { click: handleGroupClick },
      );
      const groupItems = group.items.map(item => createElement(
        'li',
        `<a target="_blank" href="${item.url}">${item.label}</a>`,
      ));
      const groupItemList = createElement('ul', groupItems);
      const groupNode = createElement(
        'li',
        [groupLabel, groupItemList],
        { class: 'group' },
      );

      this.node.appendChild(groupNode);
    });
  }

  attach(selector: string) {
    const el = document.querySelector(selector);
    if (!el) {
      console.warn(`No such element - "${selector}"`);
      return;
    }

    el.appendChild(this.node)
  }
}

function init() {
  const results: IResultGroup[] = (window as any)['resultData'];

  if (!results) {
    console.warn('No results found.');
    return;
  }

  const list = new ResultList(results);
  list.attach('#results');
}

init();
