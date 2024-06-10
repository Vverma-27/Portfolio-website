import Image from "next/image";
import React from "react";
class TreeNode {
  key: string;
  icon: any;
  path: string;
  type: "file" | "folder";
  parent: TreeNode | null;
  children: TreeNode[];
  link?: string;
  action?: string;

  constructor(
    key: string,
    icon: any = key,
    path: string,
    type: "file" | "folder",
    parent: TreeNode | null = null,
    link?: string,
    action?: string
  ) {
    this.key = key;
    this.icon = icon;
    this.path = path;
    this.type = type;
    this.parent = parent;
    this.children = [];
    this.link = link;
    this.action = action;
  }
  get isLeaf(): boolean {
    return this.children.length === 0;
  }

  renderNodeVertical(
    height: number,
    width: number,
    onclick: (action: string) => void
  ): JSX.Element {
    return (
      <div
        className="flex flex-col gap-[0.5vh] items-center justify-center px-2.5 relative cursor-pointer"
        id="file-group"
        tabIndex={0}
        onClick={() => {
          if (this.link) window.open(this.link, "_blank");
          else if (this.action) onclick(this.action);
        }}
      >
        <Image
          src={this.icon}
          alt={"chrome"}
          height={50}
          width={50}
          className="z-20"
        />
        <p className="font-extralight text-sm text-white z-20">{this.key}</p>
        <div className="overlay absolute top-0 left-0 w-full h-full bg-blue-500 opacity-0 transition-opacity duration-300 hover:opacity-20 focus:opacity-50"></div>
      </div>
    );
  }

  renderNodeHorizontal(
    height: number,
    width: number,
    onclick: (action: string, path?: string, key?: string) => void
  ): JSX.Element {
    return (
      <div
        className="flex items-center py-2 hover:bg-gray-100 z-[70]"
        onClick={() => {
          console.log((this.path + this.key).toLowerCase() + "/");
          if (this.link) window.open(this.link, "_blank");
          else if (this.action)
            onclick(
              this.action,
              (this.path + this.key).toLowerCase() + "/",
              this.parent?.key
            );
        }}
      >
        <div className="w-6 h-6 mr-2">
          <Image
            src={this.key === "Github" ? "/github-mark.png" : this.icon}
            alt={this.key}
            width={width}
            height={height}
          />
        </div>
        <div>{this.key}</div>
      </div>
    );
  }
  get hasChildren(): boolean {
    return !this.isLeaf;
  }
}

class Tree {
  root: TreeNode;

  constructor() {
    this.root = new TreeNode("root", "", "/", "folder");
  }

  preOrderTraversal(
    includeNode: boolean = true,
    node: TreeNode = this.root
  ): TreeNode[] {
    const nodes: TreeNode[] = [];
    if (includeNode) {
      nodes.push(node);
    }
    for (let child of node.children) {
      nodes.push(...this.preOrderTraversal(true, child));
    }
    return nodes;
  }
  postOrderTraversal(
    includeNode: boolean = true,
    node: TreeNode = this.root
  ): TreeNode[] {
    let nodes: TreeNode[] = [];
    for (let child of node.children) {
      nodes = nodes.concat(this.postOrderTraversal(true, child));
    }
    if (includeNode) nodes.push(node);
    return nodes;
  }
  getRootNodes(): TreeNode[] {
    const nodes = this.preOrderTraversal(false);
    return nodes.filter((node) => node.parent?.key === "root");
  }
  getNodesAtPath(path: string): TreeNode[] {
    const nodes = this.preOrderTraversal(false);
    console.log("🚀 ~ Tree ~ getNodesAtPath ~ nodes:", nodes);
    return nodes.filter((node) => node.path === path);
  }

  insert(
    parentNodeKey: string,
    key: string,
    type: "file" | "folder",
    icon: any = key,
    link?: string,
    action?: string
  ): boolean {
    const nodes = this.preOrderTraversal();
    for (let node of nodes) {
      if (node.key === parentNodeKey) {
        node.children.push(
          new TreeNode(
            key,
            icon,
            node.path +
              (parentNodeKey !== "root"
                ? parentNodeKey.toLowerCase() + "/"
                : ""),
            type,
            node,
            link,
            action
          )
        );
        return true;
      }
    }
    return false;
  }

  //   remove(key: string): boolean {
  //     const nodes = this.preOrderTraversal();
  //     for (let node of nodes) {
  //       const filtered = node.children.filter((c) => c.key !== key);
  //       if (filtered.length !== node.children.length) {
  //         node.children = filtered;
  //         return true;
  //       }
  //     }
  //     return false;
  //   }

  find(key: string): TreeNode | undefined {
    const nodes = this.preOrderTraversal();
    for (let node of nodes) {
      if (node.key === key) return node;
    }
    return undefined;
  }
}

export default Tree;
