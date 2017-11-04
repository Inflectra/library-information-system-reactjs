/*
 * NAME: Table
 * DESCRIPTION: a view/edit table, bootstrap styled 
 */

import React from 'react'
import Button from './Button.jsx'
import Select from './Select.jsx'
import permissions from '../data/permissions';

// creates an editable table that can handle dropdowns
// props contains meta information about the fields and then the array of entries themselves
// lots of use of objects (as opposed to arrays) to match up the meta information to a specific entry
let Table = (props) => { 
  // if permissions allow edits then this flog is used to render editing buttons
  const canEdit = props.permission === permissions.edit || props.permission === permissions.admin;

  /*
   * =======================
   * FIRST create the header
   * =======================
   */
  const headerCells = [];
  // only render fields set to visible
  for (const prop in props.meta) {
    if (props.meta[prop].visible) {
      headerCells.push(<th key={prop}>{props.meta[prop].name}</th>);
    }
  }
  // add edit buttons if user can edit
  if (canEdit) {
    headerCells.push(
      <th key="actions">Actions</th>
    )
  }



  /*
   * ====================
   * Create the data rows
   * ====================
   */
  // start with an array of rows to map through
  let rows = props.data.map((row, index) => {
    let dataCells = [],
        editDisabled = (props.editId && props.editId != row.id) ? true : false,
        editMode = props.editId && props.editId == row.id;
    
    // then loop over each key in the specific object
    for (const prop in row) {
      // only render fields set to visible
      if (props.meta[prop].visible) {
        // render static fields (not editable) when not editing this row
        if (!editMode || !props.meta[prop].editable) {
          // dropdowns are handled differently - need to match int saved as the value to the lookup name
          if (props.meta[prop].dropdown) {
            dataCells.push(
              <td key={prop}>
                { props.meta[prop].dropdown.filter(item => item.id == row[prop])[0].name }
              </td>
            );
          // non dropdowns are rendered as standard text
          } else {
            dataCells.push(<td key={prop}>{row[prop]}</td>);
          }
        
        // if we are in edit mode - on this specific row
        } else {
          // dropdowns are rendered as selects
          if (props.meta[prop].dropdown) {
            dataCells.push(
            <td key={prop}>
              <Select 
                name={props.meta[prop].name} 
                options={props.meta[prop].dropdown} 
                selected={row[prop]}
                param={prop}
                changeAction={props.editChange}
                />
              </td>
            )
          // otherwise render as inputs
          } else {
            dataCells.push(
              <td key={prop}>
                <input 
                  className="form-control" 
                  value={row[prop]} 
                  type="text" 
                  onChange={props.editChange.bind(this, prop)}
                  />
              </td>
            )
          }
        }
      }
    };

    // after rendering the data, if we are in edit mode add on edit buttons
    // buttons rendered are different if in edit mode or not on that row
    // if in edit mode, but the row not being edited, disable the edit button
    if (canEdit) {
      dataCells.push(
        <td key="actions">
          { editMode ?
            <div className="btn-group">
              <Button text="Save" classes="btn btn-primary btn-xs" value={row.id} onClick={props.editSave}/>
              <Button text="Cancel" classes="btn btn-default btn-xs" value={row.id} onClick={props.cancelClick}/>
            </div>
            :
            <div className="btn-group">
              <Button text="Edit" classes="btn btn-default btn-xs" value={row.id} isDisabled={editDisabled} onClick={props.editClick}/>
              {props.deleteClick ?
                <Button text="Delete" classes="btn btn-danger btn-xs" value={row.id} onClick={props.deleteClick}/>
                : null
              }
            </div>
          }
        </td>
      );
    }
    return (
      <tr key={index}>{dataCells}</tr>
    )
  });

  return (
    <div className="table-responsive">
      <table className="table table-condensed">
        <thead>
          <tr>
            {headerCells}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}


export default Table