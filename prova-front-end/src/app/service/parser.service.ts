import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NodeModel } from '../models/parser-service';

import myData from '../data.json';

@Injectable({
  providedIn: 'root'
})

export class AppService {

    public tree = myData;

    public changeTree$: Subject<object> = new Subject<object>();

    public changeInput(key: Array<number>, action: string) {
      let nodeChildren = this.tree;

      key.forEach((keys: number, index: number) => {
        const nodes = nodeChildren[keys];
        nodeChildren = nodes.children;

        if (action === 'check') {
          nodes.checked = true;
        } else if (action === 'unCheck') {
          if (index < key.length - 1) {
            let childrenChecked = 0;

            for (const childId of Object.keys(nodes.children)) {
              if (nodes.children[childId].checked === true) {
                childrenChecked++;
              }
            }

            childrenChecked > 1 ? this.checkParents(key) : nodes.checked = false;

          } else {
            nodes.checked = false;
          }
        }

        if ( index === key.length - 1) {
          this.getChildren(nodes.children, nodes.checked ? 'check' : 'unCheck');
        }
      });

      this.changeTree$.next(this.tree);
    }

    public toogleOpenNode(key) {
      let nodeChildren = this.tree;

      key.forEach((keys: number, index: number) => {
        const nodes = nodeChildren[keys];
        nodeChildren = nodes.children;

        if ( index + 1 === key.length) {
          if (nodes.open) {
            nodes.open = false;
            if (nodes.children) {
              this.getChildren(nodes.children, 'close');
            }
          } else {
            nodes.open = true;
          }
        }
      });

      this.changeTree$.next(this.tree);
    }

    private getChildren(element: NodeModel, action: string) {
      for (const key of Object.keys(element)) {
        const node = element[key];

        switch (action) {
          case 'close':
            node.open = false;
            break;
          case 'check':
            node.checked = true;
            break;
          case 'unCheck':
            node.checked = false;
            break;
        }

        if (node.children) {
          this.getChildren(node.children, action);
        }
      }
    }

    private checkParents(parentsIds): void {
      let nodeChildren = this.tree;

      parentsIds.forEach((key: number, index: number) => {
        const node = nodeChildren[key];
        nodeChildren = node.children;

        if (index < parentsIds.length - 1) {
          node.checked = true;
        }
      });
    }

    constructor() {
      const recordedTree = window.sessionStorage.getItem('tree');

      if (recordedTree) {
        this.tree = JSON.parse(recordedTree);
      }

      this.changeTree$.subscribe(() => {
        window.sessionStorage.setItem('tree', JSON.stringify(this.tree));
      });
    }
}
