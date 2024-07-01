import {
  Tree,
  useTree
} from '@mantine/core'
import dfs from './dfs';
import useData from '../../../store/useData';

const Attribs = () => {
  const tree = useTree();
  const { expandedItems, activeNode } = useData();
  const attribs = dfs(expandedItems, activeNode);
  console.log(attribs);

  
  return (
    <>
      
    </>
  )
}

export default Attribs