
import React from 'react';
import { Col, Row } from 'antd';




const ScoreCard  = ({selectID,cols,desp,title}) => {
    const col_1 = 3
    const spanNum = Math.floor((24-col_1)/ cols.length )
    // console.log(spanNum)
        return (
            <div style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <Row>
    
            </Row>
            <Row>
                {title}
            </Row>
                <Row style={{textAlign:'center',height:20,marginTop:'5px'}}>
                    <Col span={col_1}  style={{textAlign:'left'}}> {desp}</Col>
                    {cols.map((_,idx)=><Col key={idx} span={spanNum} style={{backgroundColor:selectID==idx+1?"#87CEFA":"white", border:"1px solid black"}} ></Col>)}
                </Row>
    
                <Row style={{color: 'black',textAlign:'center',height:20}}>
                {cols.map((item,idx)=><Col key={idx} span={spanNum} offset={idx==0?col_1:0} >{item}</Col>)}
                </Row>
            </div>
        )
    }

export default ScoreCard