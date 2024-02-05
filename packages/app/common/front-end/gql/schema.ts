// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    Boolean: boolean,
    Float: number,
    Int: number,
    String: string,
}


/** ordering argument of a cursor */
export type cursor_ordering = 'ASC' | 'DESC'


/** mutation root */
export interface mutation_root {
    /** delete data from the table: "steps" */
    delete_steps: (steps_mutation_response | null)
    /** delete single row from the table: "steps" */
    delete_steps_by_pk: (steps | null)
    /** delete data from the table: "trading_exchanges" */
    delete_trading_exchanges: (trading_exchanges_mutation_response | null)
    /** delete single row from the table: "trading_exchanges" */
    delete_trading_exchanges_by_pk: (trading_exchanges | null)
    /** insert data into the table: "steps" */
    insert_steps: (steps_mutation_response | null)
    /** insert a single row into the table: "steps" */
    insert_steps_one: (steps | null)
    /** insert data into the table: "trading_exchanges" */
    insert_trading_exchanges: (trading_exchanges_mutation_response | null)
    /** insert a single row into the table: "trading_exchanges" */
    insert_trading_exchanges_one: (trading_exchanges | null)
    /** update data of the table: "steps" */
    update_steps: (steps_mutation_response | null)
    /** update single row of the table: "steps" */
    update_steps_by_pk: (steps | null)
    /** update multiples rows of table: "steps" */
    update_steps_many: ((steps_mutation_response | null)[] | null)
    /** update data of the table: "trading_exchanges" */
    update_trading_exchanges: (trading_exchanges_mutation_response | null)
    /** update single row of the table: "trading_exchanges" */
    update_trading_exchanges_by_pk: (trading_exchanges | null)
    /** update multiples rows of table: "trading_exchanges" */
    update_trading_exchanges_many: ((trading_exchanges_mutation_response | null)[] | null)
    __typename: 'mutation_root'
}


/** column ordering options */
export type order_by = 'asc' | 'asc_nulls_first' | 'asc_nulls_last' | 'desc' | 'desc_nulls_first' | 'desc_nulls_last'

export interface query_root {
    /** fetch data from the table: "steps" */
    steps: steps[]
    /** fetch aggregated fields from the table: "steps" */
    steps_aggregate: steps_aggregate
    /** fetch data from the table: "steps" using primary key columns */
    steps_by_pk: (steps | null)
    /** fetch data from the table: "trading_exchanges" */
    trading_exchanges: trading_exchanges[]
    /** fetch aggregated fields from the table: "trading_exchanges" */
    trading_exchanges_aggregate: trading_exchanges_aggregate
    /** fetch data from the table: "trading_exchanges" using primary key columns */
    trading_exchanges_by_pk: (trading_exchanges | null)
    __typename: 'query_root'
}


/** columns and relationships of "steps" */
export interface steps {
    end_time: Scalars['String']
    id: Scalars['String']
    start_time: Scalars['String']
    steps: Scalars['Int']
    user_id: Scalars['Int']
    __typename: 'steps'
}


/** aggregated selection of "steps" */
export interface steps_aggregate {
    aggregate: (steps_aggregate_fields | null)
    nodes: steps[]
    __typename: 'steps_aggregate'
}


/** aggregate fields of "steps" */
export interface steps_aggregate_fields {
    avg: (steps_avg_fields | null)
    count: Scalars['Int']
    max: (steps_max_fields | null)
    min: (steps_min_fields | null)
    stddev: (steps_stddev_fields | null)
    stddev_pop: (steps_stddev_pop_fields | null)
    stddev_samp: (steps_stddev_samp_fields | null)
    sum: (steps_sum_fields | null)
    var_pop: (steps_var_pop_fields | null)
    var_samp: (steps_var_samp_fields | null)
    variance: (steps_variance_fields | null)
    __typename: 'steps_aggregate_fields'
}


/** aggregate avg on columns */
export interface steps_avg_fields {
    steps: (Scalars['Float'] | null)
    user_id: (Scalars['Float'] | null)
    __typename: 'steps_avg_fields'
}


/** unique or primary key constraints on table "steps" */
export type steps_constraint = 'steps_pkey'


/** aggregate max on columns */
export interface steps_max_fields {
    end_time: (Scalars['String'] | null)
    id: (Scalars['String'] | null)
    start_time: (Scalars['String'] | null)
    steps: (Scalars['Int'] | null)
    user_id: (Scalars['Int'] | null)
    __typename: 'steps_max_fields'
}


/** aggregate min on columns */
export interface steps_min_fields {
    end_time: (Scalars['String'] | null)
    id: (Scalars['String'] | null)
    start_time: (Scalars['String'] | null)
    steps: (Scalars['Int'] | null)
    user_id: (Scalars['Int'] | null)
    __typename: 'steps_min_fields'
}


/** response of any mutation on the table "steps" */
export interface steps_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: steps[]
    __typename: 'steps_mutation_response'
}


/** select columns of table "steps" */
export type steps_select_column = 'end_time' | 'id' | 'start_time' | 'steps' | 'user_id'


/** aggregate stddev on columns */
export interface steps_stddev_fields {
    steps: (Scalars['Float'] | null)
    user_id: (Scalars['Float'] | null)
    __typename: 'steps_stddev_fields'
}


/** aggregate stddev_pop on columns */
export interface steps_stddev_pop_fields {
    steps: (Scalars['Float'] | null)
    user_id: (Scalars['Float'] | null)
    __typename: 'steps_stddev_pop_fields'
}


/** aggregate stddev_samp on columns */
export interface steps_stddev_samp_fields {
    steps: (Scalars['Float'] | null)
    user_id: (Scalars['Float'] | null)
    __typename: 'steps_stddev_samp_fields'
}


/** aggregate sum on columns */
export interface steps_sum_fields {
    steps: (Scalars['Int'] | null)
    user_id: (Scalars['Int'] | null)
    __typename: 'steps_sum_fields'
}


/** update columns of table "steps" */
export type steps_update_column = 'end_time' | 'id' | 'start_time' | 'steps' | 'user_id'


/** aggregate var_pop on columns */
export interface steps_var_pop_fields {
    steps: (Scalars['Float'] | null)
    user_id: (Scalars['Float'] | null)
    __typename: 'steps_var_pop_fields'
}


/** aggregate var_samp on columns */
export interface steps_var_samp_fields {
    steps: (Scalars['Float'] | null)
    user_id: (Scalars['Float'] | null)
    __typename: 'steps_var_samp_fields'
}


/** aggregate variance on columns */
export interface steps_variance_fields {
    steps: (Scalars['Float'] | null)
    user_id: (Scalars['Float'] | null)
    __typename: 'steps_variance_fields'
}

export interface subscription_root {
    /** fetch data from the table: "steps" */
    steps: steps[]
    /** fetch aggregated fields from the table: "steps" */
    steps_aggregate: steps_aggregate
    /** fetch data from the table: "steps" using primary key columns */
    steps_by_pk: (steps | null)
    /** fetch data from the table in a streaming manner: "steps" */
    steps_stream: steps[]
    /** fetch data from the table: "trading_exchanges" */
    trading_exchanges: trading_exchanges[]
    /** fetch aggregated fields from the table: "trading_exchanges" */
    trading_exchanges_aggregate: trading_exchanges_aggregate
    /** fetch data from the table: "trading_exchanges" using primary key columns */
    trading_exchanges_by_pk: (trading_exchanges | null)
    /** fetch data from the table in a streaming manner: "trading_exchanges" */
    trading_exchanges_stream: trading_exchanges[]
    __typename: 'subscription_root'
}


/** columns and relationships of "trading_exchanges" */
export interface trading_exchanges {
    bybit_key: (Scalars['String'] | null)
    /** A computed field, executes function "has_bybit_key" */
    has_bybit_key: (Scalars['Boolean'] | null)
    user_id: Scalars['Int']
    __typename: 'trading_exchanges'
}


/** aggregated selection of "trading_exchanges" */
export interface trading_exchanges_aggregate {
    aggregate: (trading_exchanges_aggregate_fields | null)
    nodes: trading_exchanges[]
    __typename: 'trading_exchanges_aggregate'
}


/** aggregate fields of "trading_exchanges" */
export interface trading_exchanges_aggregate_fields {
    avg: (trading_exchanges_avg_fields | null)
    count: Scalars['Int']
    max: (trading_exchanges_max_fields | null)
    min: (trading_exchanges_min_fields | null)
    stddev: (trading_exchanges_stddev_fields | null)
    stddev_pop: (trading_exchanges_stddev_pop_fields | null)
    stddev_samp: (trading_exchanges_stddev_samp_fields | null)
    sum: (trading_exchanges_sum_fields | null)
    var_pop: (trading_exchanges_var_pop_fields | null)
    var_samp: (trading_exchanges_var_samp_fields | null)
    variance: (trading_exchanges_variance_fields | null)
    __typename: 'trading_exchanges_aggregate_fields'
}


/** aggregate avg on columns */
export interface trading_exchanges_avg_fields {
    user_id: (Scalars['Float'] | null)
    __typename: 'trading_exchanges_avg_fields'
}


/** unique or primary key constraints on table "trading_exchanges" */
export type trading_exchanges_constraint = 'trading_exchanges_pkey'


/** aggregate max on columns */
export interface trading_exchanges_max_fields {
    bybit_key: (Scalars['String'] | null)
    user_id: (Scalars['Int'] | null)
    __typename: 'trading_exchanges_max_fields'
}


/** aggregate min on columns */
export interface trading_exchanges_min_fields {
    bybit_key: (Scalars['String'] | null)
    user_id: (Scalars['Int'] | null)
    __typename: 'trading_exchanges_min_fields'
}


/** response of any mutation on the table "trading_exchanges" */
export interface trading_exchanges_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: trading_exchanges[]
    __typename: 'trading_exchanges_mutation_response'
}


/** select columns of table "trading_exchanges" */
export type trading_exchanges_select_column = 'bybit_key' | 'user_id'


/** aggregate stddev on columns */
export interface trading_exchanges_stddev_fields {
    user_id: (Scalars['Float'] | null)
    __typename: 'trading_exchanges_stddev_fields'
}


/** aggregate stddev_pop on columns */
export interface trading_exchanges_stddev_pop_fields {
    user_id: (Scalars['Float'] | null)
    __typename: 'trading_exchanges_stddev_pop_fields'
}


/** aggregate stddev_samp on columns */
export interface trading_exchanges_stddev_samp_fields {
    user_id: (Scalars['Float'] | null)
    __typename: 'trading_exchanges_stddev_samp_fields'
}


/** aggregate sum on columns */
export interface trading_exchanges_sum_fields {
    user_id: (Scalars['Int'] | null)
    __typename: 'trading_exchanges_sum_fields'
}


/** update columns of table "trading_exchanges" */
export type trading_exchanges_update_column = 'bybit_key' | 'user_id'


/** aggregate var_pop on columns */
export interface trading_exchanges_var_pop_fields {
    user_id: (Scalars['Float'] | null)
    __typename: 'trading_exchanges_var_pop_fields'
}


/** aggregate var_samp on columns */
export interface trading_exchanges_var_samp_fields {
    user_id: (Scalars['Float'] | null)
    __typename: 'trading_exchanges_var_samp_fields'
}


/** aggregate variance on columns */
export interface trading_exchanges_variance_fields {
    user_id: (Scalars['Float'] | null)
    __typename: 'trading_exchanges_variance_fields'
}

export type Query = query_root
export type Mutation = mutation_root
export type Subscription = subscription_root


/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export interface Boolean_comparison_exp {_eq?: (Scalars['Boolean'] | null),_gt?: (Scalars['Boolean'] | null),_gte?: (Scalars['Boolean'] | null),_in?: (Scalars['Boolean'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['Boolean'] | null),_lte?: (Scalars['Boolean'] | null),_neq?: (Scalars['Boolean'] | null),_nin?: (Scalars['Boolean'][] | null)}


/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export interface Int_comparison_exp {_eq?: (Scalars['Int'] | null),_gt?: (Scalars['Int'] | null),_gte?: (Scalars['Int'] | null),_in?: (Scalars['Int'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['Int'] | null),_lte?: (Scalars['Int'] | null),_neq?: (Scalars['Int'] | null),_nin?: (Scalars['Int'][] | null)}


/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export interface String_comparison_exp {_eq?: (Scalars['String'] | null),_gt?: (Scalars['String'] | null),_gte?: (Scalars['String'] | null),
/** does the column match the given case-insensitive pattern */
_ilike?: (Scalars['String'] | null),_in?: (Scalars['String'][] | null),
/** does the column match the given POSIX regular expression, case insensitive */
_iregex?: (Scalars['String'] | null),_is_null?: (Scalars['Boolean'] | null),
/** does the column match the given pattern */
_like?: (Scalars['String'] | null),_lt?: (Scalars['String'] | null),_lte?: (Scalars['String'] | null),_neq?: (Scalars['String'] | null),
/** does the column NOT match the given case-insensitive pattern */
_nilike?: (Scalars['String'] | null),_nin?: (Scalars['String'][] | null),
/** does the column NOT match the given POSIX regular expression, case insensitive */
_niregex?: (Scalars['String'] | null),
/** does the column NOT match the given pattern */
_nlike?: (Scalars['String'] | null),
/** does the column NOT match the given POSIX regular expression, case sensitive */
_nregex?: (Scalars['String'] | null),
/** does the column NOT match the given SQL regular expression */
_nsimilar?: (Scalars['String'] | null),
/** does the column match the given POSIX regular expression, case sensitive */
_regex?: (Scalars['String'] | null),
/** does the column match the given SQL regular expression */
_similar?: (Scalars['String'] | null)}


/** mutation root */
export interface mutation_rootGenqlSelection{
    /** delete data from the table: "steps" */
    delete_steps?: (steps_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: steps_bool_exp} })
    /** delete single row from the table: "steps" */
    delete_steps_by_pk?: (stepsGenqlSelection & { __args: {id: Scalars['String']} })
    /** delete data from the table: "trading_exchanges" */
    delete_trading_exchanges?: (trading_exchanges_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: trading_exchanges_bool_exp} })
    /** delete single row from the table: "trading_exchanges" */
    delete_trading_exchanges_by_pk?: (trading_exchangesGenqlSelection & { __args: {user_id: Scalars['Int']} })
    /** insert data into the table: "steps" */
    insert_steps?: (steps_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: steps_insert_input[], 
    /** upsert condition */
    on_conflict?: (steps_on_conflict | null)} })
    /** insert a single row into the table: "steps" */
    insert_steps_one?: (stepsGenqlSelection & { __args: {
    /** the row to be inserted */
    object: steps_insert_input, 
    /** upsert condition */
    on_conflict?: (steps_on_conflict | null)} })
    /** insert data into the table: "trading_exchanges" */
    insert_trading_exchanges?: (trading_exchanges_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: trading_exchanges_insert_input[], 
    /** upsert condition */
    on_conflict?: (trading_exchanges_on_conflict | null)} })
    /** insert a single row into the table: "trading_exchanges" */
    insert_trading_exchanges_one?: (trading_exchangesGenqlSelection & { __args: {
    /** the row to be inserted */
    object: trading_exchanges_insert_input, 
    /** upsert condition */
    on_conflict?: (trading_exchanges_on_conflict | null)} })
    /** update data of the table: "steps" */
    update_steps?: (steps_mutation_responseGenqlSelection & { __args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: (steps_inc_input | null), 
    /** sets the columns of the filtered rows to the given values */
    _set?: (steps_set_input | null), 
    /** filter the rows which have to be updated */
    where: steps_bool_exp} })
    /** update single row of the table: "steps" */
    update_steps_by_pk?: (stepsGenqlSelection & { __args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: (steps_inc_input | null), 
    /** sets the columns of the filtered rows to the given values */
    _set?: (steps_set_input | null), pk_columns: steps_pk_columns_input} })
    /** update multiples rows of table: "steps" */
    update_steps_many?: (steps_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: steps_updates[]} })
    /** update data of the table: "trading_exchanges" */
    update_trading_exchanges?: (trading_exchanges_mutation_responseGenqlSelection & { __args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: (trading_exchanges_inc_input | null), 
    /** sets the columns of the filtered rows to the given values */
    _set?: (trading_exchanges_set_input | null), 
    /** filter the rows which have to be updated */
    where: trading_exchanges_bool_exp} })
    /** update single row of the table: "trading_exchanges" */
    update_trading_exchanges_by_pk?: (trading_exchangesGenqlSelection & { __args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: (trading_exchanges_inc_input | null), 
    /** sets the columns of the filtered rows to the given values */
    _set?: (trading_exchanges_set_input | null), pk_columns: trading_exchanges_pk_columns_input} })
    /** update multiples rows of table: "trading_exchanges" */
    update_trading_exchanges_many?: (trading_exchanges_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: trading_exchanges_updates[]} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface query_rootGenqlSelection{
    /** fetch data from the table: "steps" */
    steps?: (stepsGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (steps_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (steps_order_by[] | null), 
    /** filter the rows returned */
    where?: (steps_bool_exp | null)} })
    /** fetch aggregated fields from the table: "steps" */
    steps_aggregate?: (steps_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (steps_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (steps_order_by[] | null), 
    /** filter the rows returned */
    where?: (steps_bool_exp | null)} })
    /** fetch data from the table: "steps" using primary key columns */
    steps_by_pk?: (stepsGenqlSelection & { __args: {id: Scalars['String']} })
    /** fetch data from the table: "trading_exchanges" */
    trading_exchanges?: (trading_exchangesGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trading_exchanges_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trading_exchanges_order_by[] | null), 
    /** filter the rows returned */
    where?: (trading_exchanges_bool_exp | null)} })
    /** fetch aggregated fields from the table: "trading_exchanges" */
    trading_exchanges_aggregate?: (trading_exchanges_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trading_exchanges_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trading_exchanges_order_by[] | null), 
    /** filter the rows returned */
    where?: (trading_exchanges_bool_exp | null)} })
    /** fetch data from the table: "trading_exchanges" using primary key columns */
    trading_exchanges_by_pk?: (trading_exchangesGenqlSelection & { __args: {user_id: Scalars['Int']} })
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** columns and relationships of "steps" */
export interface stepsGenqlSelection{
    end_time?: boolean | number
    id?: boolean | number
    start_time?: boolean | number
    steps?: boolean | number
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "steps" */
export interface steps_aggregateGenqlSelection{
    aggregate?: steps_aggregate_fieldsGenqlSelection
    nodes?: stepsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate fields of "steps" */
export interface steps_aggregate_fieldsGenqlSelection{
    avg?: steps_avg_fieldsGenqlSelection
    count?: { __args: {columns?: (steps_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: steps_max_fieldsGenqlSelection
    min?: steps_min_fieldsGenqlSelection
    stddev?: steps_stddev_fieldsGenqlSelection
    stddev_pop?: steps_stddev_pop_fieldsGenqlSelection
    stddev_samp?: steps_stddev_samp_fieldsGenqlSelection
    sum?: steps_sum_fieldsGenqlSelection
    var_pop?: steps_var_pop_fieldsGenqlSelection
    var_samp?: steps_var_samp_fieldsGenqlSelection
    variance?: steps_variance_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate avg on columns */
export interface steps_avg_fieldsGenqlSelection{
    steps?: boolean | number
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "steps". All fields are combined with a logical 'AND'. */
export interface steps_bool_exp {_and?: (steps_bool_exp[] | null),_not?: (steps_bool_exp | null),_or?: (steps_bool_exp[] | null),end_time?: (String_comparison_exp | null),id?: (String_comparison_exp | null),start_time?: (String_comparison_exp | null),steps?: (Int_comparison_exp | null),user_id?: (Int_comparison_exp | null)}


/** input type for incrementing numeric columns in table "steps" */
export interface steps_inc_input {steps?: (Scalars['Int'] | null),user_id?: (Scalars['Int'] | null)}


/** input type for inserting data into table "steps" */
export interface steps_insert_input {end_time?: (Scalars['String'] | null),id?: (Scalars['String'] | null),start_time?: (Scalars['String'] | null),steps?: (Scalars['Int'] | null),user_id?: (Scalars['Int'] | null)}


/** aggregate max on columns */
export interface steps_max_fieldsGenqlSelection{
    end_time?: boolean | number
    id?: boolean | number
    start_time?: boolean | number
    steps?: boolean | number
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate min on columns */
export interface steps_min_fieldsGenqlSelection{
    end_time?: boolean | number
    id?: boolean | number
    start_time?: boolean | number
    steps?: boolean | number
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** response of any mutation on the table "steps" */
export interface steps_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: stepsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** on_conflict condition type for table "steps" */
export interface steps_on_conflict {constraint: steps_constraint,update_columns?: steps_update_column[],where?: (steps_bool_exp | null)}


/** Ordering options when selecting data from "steps". */
export interface steps_order_by {end_time?: (order_by | null),id?: (order_by | null),start_time?: (order_by | null),steps?: (order_by | null),user_id?: (order_by | null)}


/** primary key columns input for table: steps */
export interface steps_pk_columns_input {id: Scalars['String']}


/** input type for updating data in table "steps" */
export interface steps_set_input {end_time?: (Scalars['String'] | null),id?: (Scalars['String'] | null),start_time?: (Scalars['String'] | null),steps?: (Scalars['Int'] | null),user_id?: (Scalars['Int'] | null)}


/** aggregate stddev on columns */
export interface steps_stddev_fieldsGenqlSelection{
    steps?: boolean | number
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate stddev_pop on columns */
export interface steps_stddev_pop_fieldsGenqlSelection{
    steps?: boolean | number
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate stddev_samp on columns */
export interface steps_stddev_samp_fieldsGenqlSelection{
    steps?: boolean | number
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Streaming cursor of the table "steps" */
export interface steps_stream_cursor_input {
/** Stream column input with initial value */
initial_value: steps_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface steps_stream_cursor_value_input {end_time?: (Scalars['String'] | null),id?: (Scalars['String'] | null),start_time?: (Scalars['String'] | null),steps?: (Scalars['Int'] | null),user_id?: (Scalars['Int'] | null)}


/** aggregate sum on columns */
export interface steps_sum_fieldsGenqlSelection{
    steps?: boolean | number
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface steps_updates {
/** increments the numeric columns with given value of the filtered values */
_inc?: (steps_inc_input | null),
/** sets the columns of the filtered rows to the given values */
_set?: (steps_set_input | null),
/** filter the rows which have to be updated */
where: steps_bool_exp}


/** aggregate var_pop on columns */
export interface steps_var_pop_fieldsGenqlSelection{
    steps?: boolean | number
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate var_samp on columns */
export interface steps_var_samp_fieldsGenqlSelection{
    steps?: boolean | number
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate variance on columns */
export interface steps_variance_fieldsGenqlSelection{
    steps?: boolean | number
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface subscription_rootGenqlSelection{
    /** fetch data from the table: "steps" */
    steps?: (stepsGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (steps_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (steps_order_by[] | null), 
    /** filter the rows returned */
    where?: (steps_bool_exp | null)} })
    /** fetch aggregated fields from the table: "steps" */
    steps_aggregate?: (steps_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (steps_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (steps_order_by[] | null), 
    /** filter the rows returned */
    where?: (steps_bool_exp | null)} })
    /** fetch data from the table: "steps" using primary key columns */
    steps_by_pk?: (stepsGenqlSelection & { __args: {id: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "steps" */
    steps_stream?: (stepsGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (steps_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (steps_bool_exp | null)} })
    /** fetch data from the table: "trading_exchanges" */
    trading_exchanges?: (trading_exchangesGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trading_exchanges_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trading_exchanges_order_by[] | null), 
    /** filter the rows returned */
    where?: (trading_exchanges_bool_exp | null)} })
    /** fetch aggregated fields from the table: "trading_exchanges" */
    trading_exchanges_aggregate?: (trading_exchanges_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trading_exchanges_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trading_exchanges_order_by[] | null), 
    /** filter the rows returned */
    where?: (trading_exchanges_bool_exp | null)} })
    /** fetch data from the table: "trading_exchanges" using primary key columns */
    trading_exchanges_by_pk?: (trading_exchangesGenqlSelection & { __args: {user_id: Scalars['Int']} })
    /** fetch data from the table in a streaming manner: "trading_exchanges" */
    trading_exchanges_stream?: (trading_exchangesGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (trading_exchanges_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (trading_exchanges_bool_exp | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** columns and relationships of "trading_exchanges" */
export interface trading_exchangesGenqlSelection{
    bybit_key?: boolean | number
    /** A computed field, executes function "has_bybit_key" */
    has_bybit_key?: boolean | number
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "trading_exchanges" */
export interface trading_exchanges_aggregateGenqlSelection{
    aggregate?: trading_exchanges_aggregate_fieldsGenqlSelection
    nodes?: trading_exchangesGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate fields of "trading_exchanges" */
export interface trading_exchanges_aggregate_fieldsGenqlSelection{
    avg?: trading_exchanges_avg_fieldsGenqlSelection
    count?: { __args: {columns?: (trading_exchanges_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: trading_exchanges_max_fieldsGenqlSelection
    min?: trading_exchanges_min_fieldsGenqlSelection
    stddev?: trading_exchanges_stddev_fieldsGenqlSelection
    stddev_pop?: trading_exchanges_stddev_pop_fieldsGenqlSelection
    stddev_samp?: trading_exchanges_stddev_samp_fieldsGenqlSelection
    sum?: trading_exchanges_sum_fieldsGenqlSelection
    var_pop?: trading_exchanges_var_pop_fieldsGenqlSelection
    var_samp?: trading_exchanges_var_samp_fieldsGenqlSelection
    variance?: trading_exchanges_variance_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate avg on columns */
export interface trading_exchanges_avg_fieldsGenqlSelection{
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "trading_exchanges". All fields are combined with a logical 'AND'. */
export interface trading_exchanges_bool_exp {_and?: (trading_exchanges_bool_exp[] | null),_not?: (trading_exchanges_bool_exp | null),_or?: (trading_exchanges_bool_exp[] | null),bybit_key?: (String_comparison_exp | null),has_bybit_key?: (Boolean_comparison_exp | null),user_id?: (Int_comparison_exp | null)}


/** input type for incrementing numeric columns in table "trading_exchanges" */
export interface trading_exchanges_inc_input {user_id?: (Scalars['Int'] | null)}


/** input type for inserting data into table "trading_exchanges" */
export interface trading_exchanges_insert_input {bybit_key?: (Scalars['String'] | null),user_id?: (Scalars['Int'] | null)}


/** aggregate max on columns */
export interface trading_exchanges_max_fieldsGenqlSelection{
    bybit_key?: boolean | number
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate min on columns */
export interface trading_exchanges_min_fieldsGenqlSelection{
    bybit_key?: boolean | number
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** response of any mutation on the table "trading_exchanges" */
export interface trading_exchanges_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: trading_exchangesGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** on_conflict condition type for table "trading_exchanges" */
export interface trading_exchanges_on_conflict {constraint: trading_exchanges_constraint,update_columns?: trading_exchanges_update_column[],where?: (trading_exchanges_bool_exp | null)}


/** Ordering options when selecting data from "trading_exchanges". */
export interface trading_exchanges_order_by {bybit_key?: (order_by | null),has_bybit_key?: (order_by | null),user_id?: (order_by | null)}


/** primary key columns input for table: trading_exchanges */
export interface trading_exchanges_pk_columns_input {user_id: Scalars['Int']}


/** input type for updating data in table "trading_exchanges" */
export interface trading_exchanges_set_input {bybit_key?: (Scalars['String'] | null),user_id?: (Scalars['Int'] | null)}


/** aggregate stddev on columns */
export interface trading_exchanges_stddev_fieldsGenqlSelection{
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate stddev_pop on columns */
export interface trading_exchanges_stddev_pop_fieldsGenqlSelection{
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate stddev_samp on columns */
export interface trading_exchanges_stddev_samp_fieldsGenqlSelection{
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Streaming cursor of the table "trading_exchanges" */
export interface trading_exchanges_stream_cursor_input {
/** Stream column input with initial value */
initial_value: trading_exchanges_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface trading_exchanges_stream_cursor_value_input {bybit_key?: (Scalars['String'] | null),user_id?: (Scalars['Int'] | null)}


/** aggregate sum on columns */
export interface trading_exchanges_sum_fieldsGenqlSelection{
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface trading_exchanges_updates {
/** increments the numeric columns with given value of the filtered values */
_inc?: (trading_exchanges_inc_input | null),
/** sets the columns of the filtered rows to the given values */
_set?: (trading_exchanges_set_input | null),
/** filter the rows which have to be updated */
where: trading_exchanges_bool_exp}


/** aggregate var_pop on columns */
export interface trading_exchanges_var_pop_fieldsGenqlSelection{
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate var_samp on columns */
export interface trading_exchanges_var_samp_fieldsGenqlSelection{
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate variance on columns */
export interface trading_exchanges_variance_fieldsGenqlSelection{
    user_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export type QueryGenqlSelection = query_rootGenqlSelection
export type MutationGenqlSelection = mutation_rootGenqlSelection
export type SubscriptionGenqlSelection = subscription_rootGenqlSelection


    const mutation_root_possibleTypes: string[] = ['mutation_root']
    export const ismutation_root = (obj?: { __typename?: any } | null): obj is mutation_root => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ismutation_root"')
      return mutation_root_possibleTypes.includes(obj.__typename)
    }
    


    const query_root_possibleTypes: string[] = ['query_root']
    export const isquery_root = (obj?: { __typename?: any } | null): obj is query_root => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isquery_root"')
      return query_root_possibleTypes.includes(obj.__typename)
    }
    


    const steps_possibleTypes: string[] = ['steps']
    export const issteps = (obj?: { __typename?: any } | null): obj is steps => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issteps"')
      return steps_possibleTypes.includes(obj.__typename)
    }
    


    const steps_aggregate_possibleTypes: string[] = ['steps_aggregate']
    export const issteps_aggregate = (obj?: { __typename?: any } | null): obj is steps_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issteps_aggregate"')
      return steps_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const steps_aggregate_fields_possibleTypes: string[] = ['steps_aggregate_fields']
    export const issteps_aggregate_fields = (obj?: { __typename?: any } | null): obj is steps_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issteps_aggregate_fields"')
      return steps_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const steps_avg_fields_possibleTypes: string[] = ['steps_avg_fields']
    export const issteps_avg_fields = (obj?: { __typename?: any } | null): obj is steps_avg_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issteps_avg_fields"')
      return steps_avg_fields_possibleTypes.includes(obj.__typename)
    }
    


    const steps_max_fields_possibleTypes: string[] = ['steps_max_fields']
    export const issteps_max_fields = (obj?: { __typename?: any } | null): obj is steps_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issteps_max_fields"')
      return steps_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const steps_min_fields_possibleTypes: string[] = ['steps_min_fields']
    export const issteps_min_fields = (obj?: { __typename?: any } | null): obj is steps_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issteps_min_fields"')
      return steps_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const steps_mutation_response_possibleTypes: string[] = ['steps_mutation_response']
    export const issteps_mutation_response = (obj?: { __typename?: any } | null): obj is steps_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issteps_mutation_response"')
      return steps_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const steps_stddev_fields_possibleTypes: string[] = ['steps_stddev_fields']
    export const issteps_stddev_fields = (obj?: { __typename?: any } | null): obj is steps_stddev_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issteps_stddev_fields"')
      return steps_stddev_fields_possibleTypes.includes(obj.__typename)
    }
    


    const steps_stddev_pop_fields_possibleTypes: string[] = ['steps_stddev_pop_fields']
    export const issteps_stddev_pop_fields = (obj?: { __typename?: any } | null): obj is steps_stddev_pop_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issteps_stddev_pop_fields"')
      return steps_stddev_pop_fields_possibleTypes.includes(obj.__typename)
    }
    


    const steps_stddev_samp_fields_possibleTypes: string[] = ['steps_stddev_samp_fields']
    export const issteps_stddev_samp_fields = (obj?: { __typename?: any } | null): obj is steps_stddev_samp_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issteps_stddev_samp_fields"')
      return steps_stddev_samp_fields_possibleTypes.includes(obj.__typename)
    }
    


    const steps_sum_fields_possibleTypes: string[] = ['steps_sum_fields']
    export const issteps_sum_fields = (obj?: { __typename?: any } | null): obj is steps_sum_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issteps_sum_fields"')
      return steps_sum_fields_possibleTypes.includes(obj.__typename)
    }
    


    const steps_var_pop_fields_possibleTypes: string[] = ['steps_var_pop_fields']
    export const issteps_var_pop_fields = (obj?: { __typename?: any } | null): obj is steps_var_pop_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issteps_var_pop_fields"')
      return steps_var_pop_fields_possibleTypes.includes(obj.__typename)
    }
    


    const steps_var_samp_fields_possibleTypes: string[] = ['steps_var_samp_fields']
    export const issteps_var_samp_fields = (obj?: { __typename?: any } | null): obj is steps_var_samp_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issteps_var_samp_fields"')
      return steps_var_samp_fields_possibleTypes.includes(obj.__typename)
    }
    


    const steps_variance_fields_possibleTypes: string[] = ['steps_variance_fields']
    export const issteps_variance_fields = (obj?: { __typename?: any } | null): obj is steps_variance_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issteps_variance_fields"')
      return steps_variance_fields_possibleTypes.includes(obj.__typename)
    }
    


    const subscription_root_possibleTypes: string[] = ['subscription_root']
    export const issubscription_root = (obj?: { __typename?: any } | null): obj is subscription_root => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issubscription_root"')
      return subscription_root_possibleTypes.includes(obj.__typename)
    }
    


    const trading_exchanges_possibleTypes: string[] = ['trading_exchanges']
    export const istrading_exchanges = (obj?: { __typename?: any } | null): obj is trading_exchanges => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrading_exchanges"')
      return trading_exchanges_possibleTypes.includes(obj.__typename)
    }
    


    const trading_exchanges_aggregate_possibleTypes: string[] = ['trading_exchanges_aggregate']
    export const istrading_exchanges_aggregate = (obj?: { __typename?: any } | null): obj is trading_exchanges_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrading_exchanges_aggregate"')
      return trading_exchanges_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const trading_exchanges_aggregate_fields_possibleTypes: string[] = ['trading_exchanges_aggregate_fields']
    export const istrading_exchanges_aggregate_fields = (obj?: { __typename?: any } | null): obj is trading_exchanges_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrading_exchanges_aggregate_fields"')
      return trading_exchanges_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trading_exchanges_avg_fields_possibleTypes: string[] = ['trading_exchanges_avg_fields']
    export const istrading_exchanges_avg_fields = (obj?: { __typename?: any } | null): obj is trading_exchanges_avg_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrading_exchanges_avg_fields"')
      return trading_exchanges_avg_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trading_exchanges_max_fields_possibleTypes: string[] = ['trading_exchanges_max_fields']
    export const istrading_exchanges_max_fields = (obj?: { __typename?: any } | null): obj is trading_exchanges_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrading_exchanges_max_fields"')
      return trading_exchanges_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trading_exchanges_min_fields_possibleTypes: string[] = ['trading_exchanges_min_fields']
    export const istrading_exchanges_min_fields = (obj?: { __typename?: any } | null): obj is trading_exchanges_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrading_exchanges_min_fields"')
      return trading_exchanges_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trading_exchanges_mutation_response_possibleTypes: string[] = ['trading_exchanges_mutation_response']
    export const istrading_exchanges_mutation_response = (obj?: { __typename?: any } | null): obj is trading_exchanges_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrading_exchanges_mutation_response"')
      return trading_exchanges_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const trading_exchanges_stddev_fields_possibleTypes: string[] = ['trading_exchanges_stddev_fields']
    export const istrading_exchanges_stddev_fields = (obj?: { __typename?: any } | null): obj is trading_exchanges_stddev_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrading_exchanges_stddev_fields"')
      return trading_exchanges_stddev_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trading_exchanges_stddev_pop_fields_possibleTypes: string[] = ['trading_exchanges_stddev_pop_fields']
    export const istrading_exchanges_stddev_pop_fields = (obj?: { __typename?: any } | null): obj is trading_exchanges_stddev_pop_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrading_exchanges_stddev_pop_fields"')
      return trading_exchanges_stddev_pop_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trading_exchanges_stddev_samp_fields_possibleTypes: string[] = ['trading_exchanges_stddev_samp_fields']
    export const istrading_exchanges_stddev_samp_fields = (obj?: { __typename?: any } | null): obj is trading_exchanges_stddev_samp_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrading_exchanges_stddev_samp_fields"')
      return trading_exchanges_stddev_samp_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trading_exchanges_sum_fields_possibleTypes: string[] = ['trading_exchanges_sum_fields']
    export const istrading_exchanges_sum_fields = (obj?: { __typename?: any } | null): obj is trading_exchanges_sum_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrading_exchanges_sum_fields"')
      return trading_exchanges_sum_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trading_exchanges_var_pop_fields_possibleTypes: string[] = ['trading_exchanges_var_pop_fields']
    export const istrading_exchanges_var_pop_fields = (obj?: { __typename?: any } | null): obj is trading_exchanges_var_pop_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrading_exchanges_var_pop_fields"')
      return trading_exchanges_var_pop_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trading_exchanges_var_samp_fields_possibleTypes: string[] = ['trading_exchanges_var_samp_fields']
    export const istrading_exchanges_var_samp_fields = (obj?: { __typename?: any } | null): obj is trading_exchanges_var_samp_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrading_exchanges_var_samp_fields"')
      return trading_exchanges_var_samp_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trading_exchanges_variance_fields_possibleTypes: string[] = ['trading_exchanges_variance_fields']
    export const istrading_exchanges_variance_fields = (obj?: { __typename?: any } | null): obj is trading_exchanges_variance_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrading_exchanges_variance_fields"')
      return trading_exchanges_variance_fields_possibleTypes.includes(obj.__typename)
    }
    

export const enumCursorOrdering = {
   ASC: 'ASC' as const,
   DESC: 'DESC' as const
}

export const enumOrderBy = {
   asc: 'asc' as const,
   asc_nulls_first: 'asc_nulls_first' as const,
   asc_nulls_last: 'asc_nulls_last' as const,
   desc: 'desc' as const,
   desc_nulls_first: 'desc_nulls_first' as const,
   desc_nulls_last: 'desc_nulls_last' as const
}

export const enumStepsConstraint = {
   steps_pkey: 'steps_pkey' as const
}

export const enumStepsSelectColumn = {
   end_time: 'end_time' as const,
   id: 'id' as const,
   start_time: 'start_time' as const,
   steps: 'steps' as const,
   user_id: 'user_id' as const
}

export const enumStepsUpdateColumn = {
   end_time: 'end_time' as const,
   id: 'id' as const,
   start_time: 'start_time' as const,
   steps: 'steps' as const,
   user_id: 'user_id' as const
}

export const enumTradingExchangesConstraint = {
   trading_exchanges_pkey: 'trading_exchanges_pkey' as const
}

export const enumTradingExchangesSelectColumn = {
   bybit_key: 'bybit_key' as const,
   user_id: 'user_id' as const
}

export const enumTradingExchangesUpdateColumn = {
   bybit_key: 'bybit_key' as const,
   user_id: 'user_id' as const
}
