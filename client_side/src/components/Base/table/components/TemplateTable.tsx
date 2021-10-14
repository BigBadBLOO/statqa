//core
import React, {useEffect, useState} from "react";

//components
import {Selector} from "@components/Base/Selector";
import TemplateTableModal from "@components/Base/table/components/TemplateTableModal";
import workWithServer from "@core/workWithServer";


const TemplateTable: React.FC<TemplateTable> = ({templateType, cols, allCols, setCols, columnResizing}) => {
  const [showModal, setShowModal] = useState(false)
  //get list Templates
  let initAllTemplates: Template[] = [];
  const [allTemplates, setAllTemplates] = useState(initAllTemplates)

  let initCurrentTemplate: Template = {
    name: ''
  }
  const [currentTemplate, setCurrentTemplate] = useState(initCurrentTemplate)
  const id_template = localStorage.getItem(templateType)

  useEffect(() => {
    workWithServer.getAllTableTemplates({table: templateType}).then(setAllTemplates)
    if(id_template){
      workWithServer.getTableTemplate({id: id_template}).then(setCurrentTemplate)
    }
  }, [])

  function changeTableTemplateData() {
    if(id_template){
      workWithServer.getTableTemplate({id: id_template}).then(setCurrentTemplate)
    }else{
      setCurrentTemplate(initCurrentTemplate)
    }
    workWithServer.getAllTableTemplates({table: templateType}).then(setAllTemplates)
  }
  useEffect(() => {
    if(currentTemplate.tableCols){
      const columns = currentTemplate.tableCols.map((el) => {
        const col = allCols.find(col => col.accessor === el.col)

        return {...col, width: Number(el.width), color: el.color, column_id: el.id}
      })
      setCols(columns)
    }else {
      setCols(allCols)
    }

  }, [currentTemplate])

  useEffect(() => {
    if (currentTemplate.tableCols && columnResizing.isResizingColumn === null && columnResizing.headerIdWidths) {
      const [nameCol, ] = columnResizing.headerIdWidths[0]
      const width = columnResizing.columnWidths[nameCol];
      const colTemplate = currentTemplate.tableCols.find(el => el.col === nameCol)
      if(colTemplate.width !== width.toFixed(0)){
        workWithServer.updateTableColumnTemplate({
          ...colTemplate, width: width.toFixed(0)
        }).then(template => {
          setCurrentTemplate(template)
        })
      }
    }
  }, [columnResizing]);

  const emptyTemplateList = allTemplates.length === 0 ? {
    value: '',
    label: 'Список пуст'
  } : {}

  const selectorOptions = [
      {
        value: '',
        label: <p className="border-b pb-2">Все</p>
      },
      emptyTemplateList,
      ...allTemplates.map((el: { id: number, name: string }) => ({
        value: el.id,
        label: el.name
      })),
      {
        value: 'control',
        label: <p className="flex border-t pt-2"
                  onClick={() => {
                    setShowModal(true)
                  }}
        >
          <i className="material-icons my-auto text-sm mr-2">settings</i>
          <span className="my-auto">Управление шаблонами</span>
        </p>
      }
  ]

  const selectorHandler = (data: SelectorOption) => {
    if(data.value === 'control') return
    if(data.value === ''){
      localStorage.removeItem(templateType)
      setCurrentTemplate(initCurrentTemplate)
    }else{
      localStorage.setItem(templateType, data.value)
      workWithServer.getTableTemplate({id: data.value}).then(setCurrentTemplate)
    }

  }
  return (
    <>
      <Selector
        type="secondary"
        options={selectorOptions}
        onChange={selectorHandler}
        value={
          currentTemplate.id
            ? {value: currentTemplate.id, label: currentTemplate.name}
            : {value: '', label: 'Все'}
        }
      />
      <TemplateTableModal
        show={showModal}
        setShow={setShowModal}
        templateType={templateType}
        allCols={allCols}
        allTemplates={allTemplates}
        currentTemplate={currentTemplate}
        changeTableTemplateData={changeTableTemplateData}
      />
    </>
  )
}

export default TemplateTable