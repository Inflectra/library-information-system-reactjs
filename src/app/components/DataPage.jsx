/*
 * NAME: DataPage
 * DESCRIPTION: a specific component for this app - a template for a data view/edit/entry page with a title, link to add a book, and a datatable 
 */

import React from 'react'
import Table from './Table.jsx'
import Button from './Button.jsx'

import permissions from '../data/permissions'

const DataPage = (props) => (
  <div className="row">
    <h3>
      {props.textTitle}&nbsp;
        { (props.permission === permissions.edit || props.permission === permissions.admin ) ?
          <small>
            <Button 
              isDisabled={props.dataEditingId}
              classes="btn btn-default btn-sm"
              onClick={props.dataAddStart}
              text={props.textAdd}
              />
          </small>
          : null
        }
      </h3>
    <br/>

    <Table
      cancelClick={props.dataCancelEdit}
      data={props.data}
      deleteClick={props.dataDelete}
      editClick={props.dataSetEdit}
      editId={props.dataEditingId}
      editChange={props.dataChange}
      editSave={props.dataUpdate}
      meta={props.meta}
      permission={props.permission}
    />
  </div>
) 

export default DataPage