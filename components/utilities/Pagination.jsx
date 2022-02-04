import styles from "../../styles/evaluation-page/pagination.module.scss";
import { useState } from "react";
import { Pagination } from "react-bootstrap";
import { range } from "lodash";
import { useContext } from "react";
import { UserContext } from "../../state-management/user-state/UserContext";
import { M } from "../../constants";

export default function CustomPagination(props) {
  /**
   * ? The operation of the pagination component
   *
   * - The component will recieve the pageNum component from the user
   * - The component will create the ranges for each compoenent
   * - Out-of-range pagination items will be both disabled and will have no click listeners
   * - navigator function will handle all navigation cases
   * - Each change in the props.currentPage Will Trigger a passed prop function that switches
   *  the view on each page
   *  ? Needed Props to operate the component
   *
   * - pageNum: The total number of expected pages
   * - switchView: a Parent function that recieves the new page number
   *
   */

  const {user} = useContext(UserContext);


  let stacks = [];

  for (let i = 1; i + 4 <= props.pageNum; i += 5) {
    stacks.push(range(i, i + 5));
  }
  if (props.pageNum % 5 !== 0) {
    stacks.push(
      range(
        Math.floor(props.pageNum / 5) * 5 + 1,
        Math.floor(props.pageNum / 5) * 5 + (props.pageNum % 5) + 1
      )
    );
  }

  stacks = { ...stacks };

  const [stack, setStack] = useState(stacks[0]);
  

  // the purpose of these two functions is two broadcast the local state of the pagination to the page
  const switchPage = (ind) => {
    props.switchView(parseInt(ind));
  };

  const switchStIndex = (ind) => {
    props.switchIndex(ind);
  };

  const keyButtons = (e) => {
    switchPage(e.target.id);
  };

  // CORRECT
  const firstBtn = (e) => {
    switchPage(1);
    switchStIndex(0);
  };
 // CORRECT
  const lastBtn = (e) => {
    setStack(stacks[Object.keys(stacks).length - 1], switchStIndex(Object.keys(stacks).length - 1, switchPage(props.pageNum)));
    
  };
  // CORRECT
  const nextBtn = (e) => {
    if (stacks[props.currentIndex].indexOf(props.currentPage + 1) === -1) {
      
        setStack(stacks[props.currentIndex + 1],switchStIndex(
        (prev) => prev + 1), switchPage(props.currentPage + 1))
      
    } else {
      switchPage(props.currentPage + 1);
    }
  };

  // CORRECT
  const prevBtn = (e) => {
    if (stacks[props.currentIndex].indexOf(props.currentPage - 1) === -1) {
       setStack(
         stacks[props.currentIndex - 1],
         switchStIndex((prev) => prev - 1),
         switchPage(props.currentPage - 1)
       );
    } else {
      switchPage(props.currentPage - 1);
    }
  };

  const pageMapper = (arr) => {
    return arr.map((page) => {
      if (page == props.currentPage) {
        return (
          <Pagination.Item
            className={[styles["active-btn"], styles["buttons"]]}
            id={page.toString()}
            key={page.toString()}
            
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
    });
  };

  var pagesList = pageMapper(stacks[props.currentIndex]);


  return (
    <>
      <Pagination
        className={
          styles["pagination-container"] +
          " shadow" +
          ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
        }
      >
        {props.currentPage == 1 ? (
          <Pagination.Item
            style={{ color: "#212529" }}
            className={styles["buttons"]}
            disabled
          >
            {"‹‹"}
          </Pagination.Item>
        ) : (
          <Pagination.Item
            onClick={firstBtn}
            className={styles["buttons"]}
            id="first"
          >
            {"‹‹"}
          </Pagination.Item>
        )}
        {props.currentPage == 1 ? (
          <Pagination.Item
            style={{ color: "#212529" }}
            className={styles["buttons"]}
            disabled
          >
            {"‹"}
          </Pagination.Item>
        ) : (
          <Pagination.Item
            onClick={prevBtn}
            className={styles["buttons"]}
            id="prev"
          >
            {"‹"}
          </Pagination.Item>
        )}
        {pagesList}

        {props.currentPage == props.pageNum ? (
          <Pagination.Item className={styles["buttons"]} disabled>
            {"›"}
          </Pagination.Item>
        ) : (
          <Pagination.Item
            onClick={nextBtn}
            className={styles["buttons"]}
            id="next"
          >
            {"›"}
          </Pagination.Item>
        )}
        {props.currentPage == props.pageNum ? (
          <Pagination.Item className={styles["buttons"]} disabled>
            {"››"}
          </Pagination.Item>
        ) : (
          <Pagination.Item
            onClick={lastBtn}
            className={styles["buttons"]}
            id="last"
          >
            {"››"}
          </Pagination.Item>
        )}
      </Pagination>
    </>
  );
}
