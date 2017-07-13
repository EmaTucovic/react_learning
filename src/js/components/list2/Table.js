import React from "react";
import Button from "./Button";

function Sort({sortKey, onSort, children}) {

    return(
        <Button onClick = { () => onSort(sortKey)}> {children} </Button>
    );
}

export function TableHeader(props) {
    return (
        <div style = { {width : "1500" , paddingLeft : 40} }>
            <span style={{ width: '40%', float : "left"}}><Sort sortKey = {"TITLE"} onSort = {props.onSort}>
                Title
            </Sort></span>
            <span style={{ width: '30%', float : "left" }}><Sort sortKey = {"AUTHOR"} onSort = {props.onSort}>
                Author
            </Sort></span>
            <span style={{ width: '10%' , float : "left"}}><Sort sortKey = {"COMMERNTS"} onSort = {props.onSort}>
                Comments
            </Sort></span>
            <span style={{ width: '10%', float : "left" }}>
            <Sort sortKey={'POINTS'} onSort={props.onSort}>
                Points
            </Sort></span>
        </div>
    );

}

export function Table(props){
 
        return (
            <div style ={ {width : "1500" } }>
            <ol >
                {props.list.map( (item) => 
                    <li key = {item.objectID} >
                    <span style={{ width: '40%' , float : "left"}}>
                        <a href={item.url}>{item.title}</a>
                    </span>
                    <span style={{ width: '30%' , float : "left"}}>{item.author}</span>
                    <span style={{ width: '10%' , float : "left"}}>{item.num_comments}</span>
                    <span style={{ width: '10%' , float : "left"}}>{item.points}</span>
                    </li>
                )}
            </ol>
            </div>   
        );
    
}