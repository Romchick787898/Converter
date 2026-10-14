import React, { useEffect, useState } from "react";
import styles from "./Converter.module.css";
import FetchData from "../../utils/currency/api";
import { Currency_types_obj } from "../../utils/currency/api";
import { Convert_func } from "../../utils/currency/converter_func";

const Converter = () => {
  const [input1, setInput1] = useState(NaN);
  const [input2, setInput2] = useState(NaN);
  const [input3, setInput3] = useState(NaN);

  const [result_converter, setResult_converter] = useState(0);

  useEffect(() => {
    if(isNaN(input1) || isNaN(input2) || isNaN(input3)){
      return;
    }
    const result_temp: number = Convert_func(input1, input2, input3);
    setResult_converter(result_temp);
  }, [input1, input2, input3]);

  let res: Currency_types_obj = FetchData();

  if (res.update === false) {
    try {
      const parsed_data = localStorage.getItem("last_currency");

      if (parsed_data !== null) {
        const pars_obj = JSON.parse(parsed_data);
        if (
          pars_obj &&
          typeof pars_obj === "object" &&
          "valutes" in pars_obj &&
          "update" in pars_obj
        ) {
          res = pars_obj as Currency_types_obj;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="converter">
      <div className={styles.container}>
        <span>У меня есть:</span>
        <span color="brown">Хочу приобрести:</span>

        <form id="first_sum_form">
          <ul className={styles.menu_currency}>
            {res.valutes.map((item: any, index) => {
              if (index === 0) {
                return (
                  <li key={index} title={`Российский рубль`}>
                    <label htmlFor={`first_RUR`}>"RUR"</label>
                    <input
                      className={styles.btn_currency}
                      type="radio"
                      value={1}
                      name="currency_1"
                      id={`first_RUR`}
                      onChange={(event) => {
                        setInput1(Number(event.target.value));
                      }}
                    />
                  </li>
                );
              }
              return (
                <li key={index} title={item.Name}>
                  <label htmlFor={`first_${item.CharCode}`}>
                    {JSON.stringify(item.CharCode)}
                  </label>
                  <input
                    className={styles.btn_currency}
                    type="radio"
                    value={JSON.stringify(item.Value)}
                    
                    name="currency_1"
                    id={`first_${item.CharCode}`}
                    onChange={(event) => {
                      setInput1(Number(event.target.value));
                    }}
                  />
                </li>
              );
            })}
          </ul>

          <input
            type="number"
            className={styles.inp_currency}
            onChange={(event) => {
              setInput2(Number(event.target.value));
            }}
          />
        </form>

        <form id="second_sum_form">
          <ul className={styles.menu_currency}>
            {res.valutes.map((item: any, index) => {
              if (index === 0) {
                return (
                  <li key={index} title={`Российский рубль`}>
                    
                    <label htmlFor={`second_RUR`} >"RUR"</label>
                    <input
                      className={styles.btn_currency}
                      
                      type="radio"
                      value={1}
                      key={index}
                      name="currency_1"
                      id={`second_RUR`}
                
                      onChange={(event) => {
                        setInput3(Number(event.target.value));
                      }}
                    />
                  </li>
                );
              }

              return (
                <li key={index} title={item.Name}>
                  <label htmlFor={`second_${item.CharCode}`}>
                    {JSON.stringify(item.CharCode)}
                  </label>
                  <input
                    className={styles.btn_currency}
                    type="radio"
                    value={JSON.stringify(item.Value)}
                    key={index}
                    name="currency_1"
                    id={`second_${item.CharCode}`}
                    onChange={(event) => {
                      setInput3(Number(event.target.value));
                    }}
                  ></input>
                </li>
              );
            })}
          </ul>

          <input
            type="number"
            className={styles.inp_currency}
            disabled
            value={result_converter}
          />
        </form>

        <time dateTime={JSON.stringify(res.time_update)}>Данные за: {JSON.stringify(res.time_update)}</time>
      </div>
    </div>
  );
};

export default Converter;
