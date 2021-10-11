//core
import React from "react";
import {useHistory} from "react-router-dom";
import StackGrid, {transitions} from "react-stack-grid";
import {withSize} from 'react-sizeme';

//redux
import OneStatistic from "@pages/user.auth/home/OneStatistic";
import {useAppSelector} from "@/store/hooks";

const {scaleDown} = transitions;

interface IListOfStatistic {
  statistics: Statistic[]
  size: { width: number}
}

const ListOfStatistic: React.FC<IListOfStatistic> = ({statistics,size}) => {
  let history = useHistory();
  const selectedStatistics = useAppSelector((state) => state.pageStatistic.selectedStatistic);


  const width = size.width <= 768 ? '100%' : size.width <= 1024 ? '33.3%' : '25%'
  return <div className="mt-4 w-full">
    <StackGrid
      gutterHeight={30}
      gutterWidth={30}
      columnWidth={width}
      appear={scaleDown.appear}
      appeared={scaleDown.appeared}
      enter={scaleDown.enter}
      entered={scaleDown.entered}
      leaved={scaleDown.leaved}
    >
      <div className="bg-white rounded-xl p-4 px-8 border border-gold border-dashed">
        <p className="font-bold text-lg text-black text-center">
          Создать новую<br/>статистику
        </p>
        <p className="text-center">
          <i
            className="w-full md:w-64 text-gold text-5xl  material-icons mx-auto cursor-pointer"
            onClick={() => history.push('/createStatistic')}
          >add_circle</i>
        </p>
      </div>
      {
        statistics.map(statistic => {
          const isSelected = !!selectedStatistics.find(id => id === statistic.id)
          return <OneStatistic key={statistic.id} statistic={statistic} isSelected={isSelected}/>
        })
      }
    </StackGrid>
  </div>
}

export default withSize()(ListOfStatistic)