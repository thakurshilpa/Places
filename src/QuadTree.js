'use strict'

let Node = function(rect) {
    this.rect = rect;
    this.entries = [];
    this.isLeaf = true;
    this.childNW = null;
    this.childNE = null;
    this.childSW = null;
    this.childSE = null;
   // console.log("Node: " + JSON.stringify(rect));
}

Node.prototype.addEntry = function(entry) {
    this.entries.push(entry);
}

Node.prototype.hasPoint = function(point) {
    return this.rect.hasPoint(point.getMeterX(), point.getMeterY());
}

Node.prototype.splitTo4 = function() {
    //console.log("splitTo4: " + JSON.stringify(this.rect));
    if(!this.isLeaf) return;
    this.isLeaf = false;
    this.childNW = new Node(this.rect.rectNW());
    this.childNE = new Node(this.rect.rectNE());
    this.childSW = new Node(this.rect.rectSW());
    this.childSE = new Node(this.rect.rectSE());
    for(let kk = 0; kk < this.entries.length; kk++) {
        let point = this.entries[kk];
        if (this.childNW.hasPoint(point)) {
            this.childNW.addEntry(point);
        } else if (this.childNE.hasPoint(point)) {
            this.childNE.addEntry(point);
        } else if (this.childSW.hasPoint(point)) {
            this.childSW.addEntry(point);
        } else if(this.childSE.hasPoint(point)) {
            this.childSE.addEntry(point);
        }
    }

    //console.log("ChildNW: " + this.childNW.entries.length);
    //console.log("ChildNE: " + this.childNE.entries.length);
    //console.log("ChildSW: " + this.childSW.entries.length);
    //console.log("ChildSE: " + this.childSE.entries.length);
    this.entries = [];
}

let QuadTree = function(rect, maxEntries, minRect) {
    this.root = new Node(rect);
    this.maxEntries = maxEntries;
    // minLength below which we will not break the rectangle
    this.minRect = minRect; 
}

QuadTree.prototype.addEntry = function(point) {
    this.addEntryImpl(this.root, point);
}

QuadTree.prototype.getEntriesInRange = function(rangeRect) {
    return getEntriesInRangeImpl(this.root, rangeRect);
}

let getEntriesInRangeImpl = function(root, rangeRect) {
    let entries = [];
    if(!root.rect.intersect(rangeRect)) {
        return entries;
    }

    if(root.isLeaf) {
        entries = entries.concat(root.entries);
        return entries;
    }

    entries = entries.concat(getEntriesInRangeImpl(root.childNW, rangeRect));
    entries = entries.concat(getEntriesInRangeImpl(root.childNE, rangeRect));
    entries = entries.concat(getEntriesInRangeImpl(root.childSW, rangeRect));
    entries = entries.concat(getEntriesInRangeImpl(root.childSE, rangeRect));
    return entries;
}

QuadTree.prototype.getMeta = function() {
    let entryCount = 0;
    let nodeCount = 0;
    let leafCount = 0;
    let emptyLeafCount = 0;
    let maxEntries = 0;
    let maxDepth = 0;
    iterateImpl(this.root, 0, function(node, depth){
        nodeCount = nodeCount + 1;
        entryCount = entryCount + node.entries.length;
        leafCount = node.isLeaf ? leafCount + 1 : leafCount;
        emptyLeafCount = node.isLeaf && node.entries.length > 0 ? emptyLeafCount + 1 : emptyLeafCount;
        maxEntries = Math.max(node.entries.length, maxEntries);
        maxDepth = Math.max(depth, maxDepth);
    });

    return { nodeCount: nodeCount, 
             entryCount: entryCount, 
             leafCount: leafCount,
             emptyLeafCount: emptyLeafCount,
             tileMaxEntries: maxEntries,
             maxDepth: maxDepth
    };
}

let iterateImpl = function(node, depth, callback) {
    callback(node, depth);
    if(!node.isLeaf) {
        iterateImpl(node.childNW, depth + 1, callback);
        iterateImpl(node.childNE, depth + 1, callback);
        iterateImpl(node.childSW, depth + 1, callback);
        iterateImpl(node.childSE, depth + 1, callback);
    }
}

QuadTree.prototype.addEntryImpl = function(node, point) {
    if (node.isLeaf && (node.entries.length < this.maxEntries || node.rect.isLessThan(this.minRect))) {
        if(node.entries.length >= this.maxEntries && node.rect.isLessThan(this.minRect)) {
            console.log("QuadTree:Threshold:NotBreakingSinceBelowMinRect:Entries: " + node.entries.length);
        }

        node.addEntry(point);
        return;
    } else if(node.isLeaf) {
        // Decompose the current node
        node.splitTo4();
    }

    // Find the appropriate sub-tree to insert node
    if (node.childNW.hasPoint(point)) {
        this.addEntryImpl(node.childNW, point);
    } else if (node.childNE.hasPoint(point)) {
        this.addEntryImpl(node.childNE, point);
    } else if (node.childSW.hasPoint(point)) {
        this.addEntryImpl(node.childSW, point);
    } else {
        this.addEntryImpl(node.childSE, point);
    }
}

module.exports = {
    QuadTree: QuadTree
};