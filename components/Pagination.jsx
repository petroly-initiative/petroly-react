import styles from "../styles/evaluation-page/pagination.module.scss";
import { useEffect, useState } from "react";
import { Button, Pagination } from "react-bootstrap";
import { range } from "lodash";
export default function CustomPagination(props) {
  /**
   * ? The operation of the pagination component
   *
   * - The component will recieve the pageNum component from the user
   * - The component will create the ranges for each compoenent
   * - Out-of-range pagination items will be both disabled and will have no click listeners
   * - navigator function will handle all navigation cases
   * - Each change in the currentPage Will Trigger a passed prop function that switches
   *  the view on each page
   *  ? Needed Props to operate the component
   *
   * - pageNum: The total number of expected pages
   * - switchView: a Parent function that recieves the new page number
   *
   */

  let stacks = [];

  for (let i = 1; i + 4 < props.pageNum; i += 5) {
    stacks.push(range(i, i + 5));
  }
  if (props.pageNum % 5 !== 0) {
    stacks.push(
      range(Math.floor(props.pageNum / 5) * 5 + 1,
      Math.floor(props.pageNum / 5) * 5 + (props.pageNum % 5) + 1)
    );
  }
  // CORRECT ----------------------

  stacks = {...stacks}  

  const [currentPage, setPage] = useState(1);
  const [stack, setStack] = useState(stacks[0]);
  const [stackIndex, setIndex] = useState(0)

  const stackSearch = (value) => 
     Object.keys(stacks).find(key => stacks[key] === value);

  const switchPage = (ind) => {
    setPage(parseInt(ind), props.switchView(parseInt(ind)));
  };

  const keyButtons = (e) =>{
    switchPage((e.target.id));
  }

  const firstBtn = (e) => {
     console.log(stack);
    setStack(stacks[0], switchPage(1));
    setIndex(0)
  }

  const lastBtn = (e) => {
     console.log(stack);
    setStack(stacks[Object.keys(stacks).length - 1], switchPage(props.pageNum));
    setIndex(Object.keys(stacks).length - 1);
  }

  const nextBtn = (e) => {
     console.log("Out of stack?", stack.indexOf(currentPage + 1) === -1 );
    if (stack.indexOf(currentPage + 1) === -1) {
      console.log("old Stack: ", stack);
      setIndex(
        (prev) => prev + 1,
        setStack(stacks[stackIndex + 1], switchPage(currentPage + 1))
      );
      console.log("New Stack: ", stack);
    } else {
      switchPage(currentPage + 1);
    }
     console.log("Stack index:",stackIndex);
  }

  const prevBtn = (e) => {
    console.log("Out of stack?", stack.indexOf(currentPage - 1) === -1);
    if(stack.indexOf(currentPage - 1) === -1){
      setIndex((prev) => prev - 1, setStack(stacks[stackIndex - 1], switchPage( currentPage - 1)));
    }else{
      switchPage(currentPage - 1)
    }
  }
  

  const pageMapper = (arr) =>
    {console.log("New Array of pages:",arr);
       return arr.map((page) => {
      if (page == currentPage) {
        return (
          <Pagination.Item
            className={[styles["active-btn"], styles["buttons"]]}
            id={page.toString()}
            key={page.toString()}
            active
          >
            {page}
          </Pagination.Item>
        );
      } else
        return (
          <Pagination.Item
            className={styles["buttons"]}
            onClick={keyButtons}
            key={page.toString()}
            id={page.toString()}
          >
            {page}
          </Pagination.Item>
        );
    });}

  var pagesList = pageMapper(stack);

  useEffect(() => {
    pagesList = pageMapper(stack);
  }, [ currentPage]);

  useEffect(() => {
    console.log(stacks)
    console.log(Object.keys(stacks).length);
  }, []);

  useEffect(() => {
    console.log("Stack index Changed!",stackIndex)
  }, [stackIndex])

  return (
    <>
      <Pagination>
        {currentPage == 1 ? (
          <Pagination.First
            style={{ color: "#212529" }}
            className={styles["buttons"]}
            disabled
          />
        ) : (
          <Pagination.First
            onClick={firstBtn}
            className={styles["buttons"]}
            id="first"
          />
        )}
        {currentPage == 1 ? (
          <Pagination.Prev
            style={{ color: "#212529" }}
            className={styles["buttons"]}
            disabled
          />
        ) : (
          <Pagination.Prev
            onClick={prevBtn}
            className={styles["buttons"]}
            id="prev"
          />
        )}
        {pagesList}

        {currentPage == props.pageNum ? (
          <Pagination.Next disabled />
        ) : (
          <Pagination.Next
            onClick={nextBtn}
            className={styles["buttons"]}
            id="next"
          />
        )}
        {currentPage == props.pageNum ? (
          <Pagination.Last disabled />
        ) : (
          <Pagination.Last
            onClick={lastBtn}
            className={styles["buttons"]}
            id="last"
          />
        )}
      </Pagination>
    </>
  );
}
