const dfs = (expandedItems, activeNode) => {
    if (!expandedItems || expandedItems.length === 0) return [];

    const visited = new Set();
    const result = [];
    const maxDepth = 3;

    const dfsRecursive = (node, depth, visited, result) => {
        if (!node || visited.has(node) || depth > maxDepth) {
            return;
        }

        visited.add(node);
        result.push(node.name);

        if (node.children && Array.isArray(node.children)) {
            node.children.forEach(child => {
                dfsRecursive(child, depth + 1, visited, result)
            });
        }
    };

    dfsRecursive(activeNode, 0, visited, result);
    return result;
};

export default dfs;