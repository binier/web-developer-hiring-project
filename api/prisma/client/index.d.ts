import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.6.2
 * Query Engine version: 6a8054bb549e4cc23f157b0010cb2e95cb2637fb
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type PrismaAction =
  | 'findOne'
  | 'findMany'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Policies
 * const policies = await prisma.policy.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Policies
   * const policies = await prisma.policy.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$executeRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.policy`: Exposes CRUD operations for the **Policy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Policies
    * const policies = await prisma.policy.findMany()
    * ```
    */
  get policy(): PolicyDelegate;

  /**
   * `prisma.state`: Exposes CRUD operations for the **State** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more States
    * const states = await prisma.state.findMany()
    * ```
    */
  get state(): StateDelegate;

  /**
   * `prisma.invoice`: Exposes CRUD operations for the **Invoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invoices
    * const invoices = await prisma.invoice.findMany()
    * ```
    */
  get invoice(): InvoiceDelegate;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): PaymentDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const PolicyDistinctFieldEnum: {
  id: 'id',
  number: 'number',
  annual_premium: 'annual_premium',
  effective_date: 'effective_date',
  created: 'created',
  updated: 'updated'
};

export declare type PolicyDistinctFieldEnum = (typeof PolicyDistinctFieldEnum)[keyof typeof PolicyDistinctFieldEnum]


export declare const StateDistinctFieldEnum: {
  id: 'id',
  policy_id: 'policy_id',
  status: 'status',
  reason: 'reason',
  created: 'created',
  updated: 'updated'
};

export declare type StateDistinctFieldEnum = (typeof StateDistinctFieldEnum)[keyof typeof StateDistinctFieldEnum]


export declare const InvoiceDistinctFieldEnum: {
  id: 'id',
  policy_id: 'policy_id',
  amount_due: 'amount_due',
  due_on: 'due_on',
  created: 'created',
  updated: 'updated'
};

export declare type InvoiceDistinctFieldEnum = (typeof InvoiceDistinctFieldEnum)[keyof typeof InvoiceDistinctFieldEnum]


export declare const PaymentDistinctFieldEnum: {
  id: 'id',
  policy_id: 'policy_id',
  payment_amount: 'payment_amount',
  created: 'created',
  updated: 'updated'
};

export declare type PaymentDistinctFieldEnum = (typeof PaymentDistinctFieldEnum)[keyof typeof PaymentDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]



/**
 * Model Policy
 */

export type Policy = {
  id: number
  number: string
  annual_premium: number | null
  effective_date: Date | null
  created: Date
  updated: Date
}


export type AggregatePolicy = {
  count: number
  avg: PolicyAvgAggregateOutputType | null
  sum: PolicySumAggregateOutputType | null
  min: PolicyMinAggregateOutputType | null
  max: PolicyMaxAggregateOutputType | null
}

export type PolicyAvgAggregateOutputType = {
  id: number
  annual_premium: number
}

export type PolicySumAggregateOutputType = {
  id: number
  annual_premium: number | null
}

export type PolicyMinAggregateOutputType = {
  id: number
  annual_premium: number | null
}

export type PolicyMaxAggregateOutputType = {
  id: number
  annual_premium: number | null
}


export type PolicyAvgAggregateInputType = {
  id?: true
  annual_premium?: true
}

export type PolicySumAggregateInputType = {
  id?: true
  annual_premium?: true
}

export type PolicyMinAggregateInputType = {
  id?: true
  annual_premium?: true
}

export type PolicyMaxAggregateInputType = {
  id?: true
  annual_premium?: true
}

export type AggregatePolicyArgs = {
  where?: PolicyWhereInput
  orderBy?: Enumerable<PolicyOrderByInput>
  cursor?: PolicyWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PolicyDistinctFieldEnum>
  count?: true
  avg?: PolicyAvgAggregateInputType
  sum?: PolicySumAggregateInputType
  min?: PolicyMinAggregateInputType
  max?: PolicyMaxAggregateInputType
}

export type GetPolicyAggregateType<T extends AggregatePolicyArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetPolicyAggregateScalarType<T[P]>
}

export type GetPolicyAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof PolicyAvgAggregateOutputType ? PolicyAvgAggregateOutputType[P] : never
}
    
    

export type PolicySelect = {
  id?: boolean
  number?: boolean
  annual_premium?: boolean
  effective_date?: boolean
  created?: boolean
  updated?: boolean
  invoice?: boolean | InvoiceArgs
  states?: boolean | FindManyStateArgs
  payments?: boolean | FindManyPaymentArgs
}

export type PolicyInclude = {
  invoice?: boolean | InvoiceArgs
  states?: boolean | FindManyStateArgs
  payments?: boolean | FindManyPaymentArgs
}

export type PolicyGetPayload<
  S extends boolean | null | undefined | PolicyArgs,
  U = keyof S
> = S extends true
  ? Policy
  : S extends undefined
  ? never
  : S extends PolicyArgs | FindManyPolicyArgs
  ? 'include' extends U
    ? Policy  & {
      [P in TrueKeys<S['include']>]:
      P extends 'invoice'
      ? InvoiceGetPayload<S['include'][P]> :
      P extends 'states'
      ? Array<StateGetPayload<S['include'][P]>> :
      P extends 'payments'
      ? Array<PaymentGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Policy ? Policy[P]
: 
      P extends 'invoice'
      ? InvoiceGetPayload<S['select'][P]> :
      P extends 'states'
      ? Array<StateGetPayload<S['select'][P]>> :
      P extends 'payments'
      ? Array<PaymentGetPayload<S['select'][P]>> : never
    }
  : Policy
: Policy


export interface PolicyDelegate {
  /**
   * Find zero or one Policy.
   * @param {FindOnePolicyArgs} args - Arguments to find a Policy
   * @example
   * // Get one Policy
   * const policy = await prisma.policy.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePolicyArgs>(
    args: Subset<T, FindOnePolicyArgs>
  ): CheckSelect<T, Prisma__PolicyClient<Policy | null>, Prisma__PolicyClient<PolicyGetPayload<T> | null>>
  /**
   * Find zero or more Policies.
   * @param {FindManyPolicyArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Policies
   * const policies = await prisma.policy.findMany()
   * 
   * // Get first 10 Policies
   * const policies = await prisma.policy.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const policyWithIdOnly = await prisma.policy.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyPolicyArgs>(
    args?: Subset<T, FindManyPolicyArgs>
  ): CheckSelect<T, Promise<Array<Policy>>, Promise<Array<PolicyGetPayload<T>>>>
  /**
   * Create a Policy.
   * @param {PolicyCreateArgs} args - Arguments to create a Policy.
   * @example
   * // Create one Policy
   * const Policy = await prisma.policy.create({
   *   data: {
   *     // ... data to create a Policy
   *   }
   * })
   * 
  **/
  create<T extends PolicyCreateArgs>(
    args: Subset<T, PolicyCreateArgs>
  ): CheckSelect<T, Prisma__PolicyClient<Policy>, Prisma__PolicyClient<PolicyGetPayload<T>>>
  /**
   * Delete a Policy.
   * @param {PolicyDeleteArgs} args - Arguments to delete one Policy.
   * @example
   * // Delete one Policy
   * const Policy = await prisma.policy.delete({
   *   where: {
   *     // ... filter to delete one Policy
   *   }
   * })
   * 
  **/
  delete<T extends PolicyDeleteArgs>(
    args: Subset<T, PolicyDeleteArgs>
  ): CheckSelect<T, Prisma__PolicyClient<Policy>, Prisma__PolicyClient<PolicyGetPayload<T>>>
  /**
   * Update one Policy.
   * @param {PolicyUpdateArgs} args - Arguments to update one Policy.
   * @example
   * // Update one Policy
   * const policy = await prisma.policy.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends PolicyUpdateArgs>(
    args: Subset<T, PolicyUpdateArgs>
  ): CheckSelect<T, Prisma__PolicyClient<Policy>, Prisma__PolicyClient<PolicyGetPayload<T>>>
  /**
   * Delete zero or more Policies.
   * @param {PolicyDeleteManyArgs} args - Arguments to filter Policies to delete.
   * @example
   * // Delete a few Policies
   * const { count } = await prisma.policy.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends PolicyDeleteManyArgs>(
    args: Subset<T, PolicyDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Policies.
   * @param {PolicyUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Policies
   * const policy = await prisma.policy.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends PolicyUpdateManyArgs>(
    args: Subset<T, PolicyUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Policy.
   * @param {PolicyUpsertArgs} args - Arguments to update or create a Policy.
   * @example
   * // Update or create a Policy
   * const policy = await prisma.policy.upsert({
   *   create: {
   *     // ... data to create a Policy
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Policy we want to update
   *   }
   * })
  **/
  upsert<T extends PolicyUpsertArgs>(
    args: Subset<T, PolicyUpsertArgs>
  ): CheckSelect<T, Prisma__PolicyClient<Policy>, Prisma__PolicyClient<PolicyGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyPolicyArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregatePolicyArgs>(args: Subset<T, AggregatePolicyArgs>): Promise<GetPolicyAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Policy.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__PolicyClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  invoice<T extends InvoiceArgs = {}>(args?: Subset<T, InvoiceArgs>): CheckSelect<T, Prisma__InvoiceClient<Invoice | null>, Prisma__InvoiceClient<InvoiceGetPayload<T> | null>>;

  states<T extends FindManyStateArgs = {}>(args?: Subset<T, FindManyStateArgs>): CheckSelect<T, Promise<Array<State>>, Promise<Array<StateGetPayload<T>>>>;

  payments<T extends FindManyPaymentArgs = {}>(args?: Subset<T, FindManyPaymentArgs>): CheckSelect<T, Promise<Array<Payment>>, Promise<Array<PaymentGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Policy findOne
 */
export type FindOnePolicyArgs = {
  /**
   * Select specific fields to fetch from the Policy
  **/
  select?: PolicySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PolicyInclude | null
  /**
   * Filter, which Policy to fetch.
  **/
  where: PolicyWhereUniqueInput
}


/**
 * Policy findMany
 */
export type FindManyPolicyArgs = {
  /**
   * Select specific fields to fetch from the Policy
  **/
  select?: PolicySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PolicyInclude | null
  /**
   * Filter, which Policies to fetch.
  **/
  where?: PolicyWhereInput
  /**
   * Determine the order of the Policies to fetch.
  **/
  orderBy?: Enumerable<PolicyOrderByInput>
  /**
   * Sets the position for listing Policies.
  **/
  cursor?: PolicyWhereUniqueInput
  /**
   * The number of Policies to fetch. If negative number, it will take Policies before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Policies.
  **/
  skip?: number
  distinct?: Enumerable<PolicyDistinctFieldEnum>
}


/**
 * Policy create
 */
export type PolicyCreateArgs = {
  /**
   * Select specific fields to fetch from the Policy
  **/
  select?: PolicySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PolicyInclude | null
  /**
   * The data needed to create a Policy.
  **/
  data: PolicyCreateInput
}


/**
 * Policy update
 */
export type PolicyUpdateArgs = {
  /**
   * Select specific fields to fetch from the Policy
  **/
  select?: PolicySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PolicyInclude | null
  /**
   * The data needed to update a Policy.
  **/
  data: PolicyUpdateInput
  /**
   * Choose, which Policy to update.
  **/
  where: PolicyWhereUniqueInput
}


/**
 * Policy updateMany
 */
export type PolicyUpdateManyArgs = {
  data: PolicyUpdateManyMutationInput
  where?: PolicyWhereInput
}


/**
 * Policy upsert
 */
export type PolicyUpsertArgs = {
  /**
   * Select specific fields to fetch from the Policy
  **/
  select?: PolicySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PolicyInclude | null
  /**
   * The filter to search for the Policy to update in case it exists.
  **/
  where: PolicyWhereUniqueInput
  /**
   * In case the Policy found by the `where` argument doesn't exist, create a new Policy with this data.
  **/
  create: PolicyCreateInput
  /**
   * In case the Policy was found with the provided `where` argument, update it with this data.
  **/
  update: PolicyUpdateInput
}


/**
 * Policy delete
 */
export type PolicyDeleteArgs = {
  /**
   * Select specific fields to fetch from the Policy
  **/
  select?: PolicySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PolicyInclude | null
  /**
   * Filter which Policy to delete.
  **/
  where: PolicyWhereUniqueInput
}


/**
 * Policy deleteMany
 */
export type PolicyDeleteManyArgs = {
  where?: PolicyWhereInput
}


/**
 * Policy without action
 */
export type PolicyArgs = {
  /**
   * Select specific fields to fetch from the Policy
  **/
  select?: PolicySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PolicyInclude | null
}



/**
 * Model State
 */

export type State = {
  id: number
  policy_id: number
  status: string
  reason: string
  created: Date
  updated: Date
}


export type AggregateState = {
  count: number
  avg: StateAvgAggregateOutputType | null
  sum: StateSumAggregateOutputType | null
  min: StateMinAggregateOutputType | null
  max: StateMaxAggregateOutputType | null
}

export type StateAvgAggregateOutputType = {
  id: number
  policy_id: number
}

export type StateSumAggregateOutputType = {
  id: number
  policy_id: number
}

export type StateMinAggregateOutputType = {
  id: number
  policy_id: number
}

export type StateMaxAggregateOutputType = {
  id: number
  policy_id: number
}


export type StateAvgAggregateInputType = {
  id?: true
  policy_id?: true
}

export type StateSumAggregateInputType = {
  id?: true
  policy_id?: true
}

export type StateMinAggregateInputType = {
  id?: true
  policy_id?: true
}

export type StateMaxAggregateInputType = {
  id?: true
  policy_id?: true
}

export type AggregateStateArgs = {
  where?: StateWhereInput
  orderBy?: Enumerable<StateOrderByInput>
  cursor?: StateWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<StateDistinctFieldEnum>
  count?: true
  avg?: StateAvgAggregateInputType
  sum?: StateSumAggregateInputType
  min?: StateMinAggregateInputType
  max?: StateMaxAggregateInputType
}

export type GetStateAggregateType<T extends AggregateStateArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetStateAggregateScalarType<T[P]>
}

export type GetStateAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof StateAvgAggregateOutputType ? StateAvgAggregateOutputType[P] : never
}
    
    

export type StateSelect = {
  id?: boolean
  policy_id?: boolean
  status?: boolean
  reason?: boolean
  created?: boolean
  updated?: boolean
  policy?: boolean | PolicyArgs
}

export type StateInclude = {
  policy?: boolean | PolicyArgs
}

export type StateGetPayload<
  S extends boolean | null | undefined | StateArgs,
  U = keyof S
> = S extends true
  ? State
  : S extends undefined
  ? never
  : S extends StateArgs | FindManyStateArgs
  ? 'include' extends U
    ? State  & {
      [P in TrueKeys<S['include']>]:
      P extends 'policy'
      ? PolicyGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof State ? State[P]
: 
      P extends 'policy'
      ? PolicyGetPayload<S['select'][P]> : never
    }
  : State
: State


export interface StateDelegate {
  /**
   * Find zero or one State.
   * @param {FindOneStateArgs} args - Arguments to find a State
   * @example
   * // Get one State
   * const state = await prisma.state.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneStateArgs>(
    args: Subset<T, FindOneStateArgs>
  ): CheckSelect<T, Prisma__StateClient<State | null>, Prisma__StateClient<StateGetPayload<T> | null>>
  /**
   * Find zero or more States.
   * @param {FindManyStateArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all States
   * const states = await prisma.state.findMany()
   * 
   * // Get first 10 States
   * const states = await prisma.state.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const stateWithIdOnly = await prisma.state.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyStateArgs>(
    args?: Subset<T, FindManyStateArgs>
  ): CheckSelect<T, Promise<Array<State>>, Promise<Array<StateGetPayload<T>>>>
  /**
   * Create a State.
   * @param {StateCreateArgs} args - Arguments to create a State.
   * @example
   * // Create one State
   * const State = await prisma.state.create({
   *   data: {
   *     // ... data to create a State
   *   }
   * })
   * 
  **/
  create<T extends StateCreateArgs>(
    args: Subset<T, StateCreateArgs>
  ): CheckSelect<T, Prisma__StateClient<State>, Prisma__StateClient<StateGetPayload<T>>>
  /**
   * Delete a State.
   * @param {StateDeleteArgs} args - Arguments to delete one State.
   * @example
   * // Delete one State
   * const State = await prisma.state.delete({
   *   where: {
   *     // ... filter to delete one State
   *   }
   * })
   * 
  **/
  delete<T extends StateDeleteArgs>(
    args: Subset<T, StateDeleteArgs>
  ): CheckSelect<T, Prisma__StateClient<State>, Prisma__StateClient<StateGetPayload<T>>>
  /**
   * Update one State.
   * @param {StateUpdateArgs} args - Arguments to update one State.
   * @example
   * // Update one State
   * const state = await prisma.state.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends StateUpdateArgs>(
    args: Subset<T, StateUpdateArgs>
  ): CheckSelect<T, Prisma__StateClient<State>, Prisma__StateClient<StateGetPayload<T>>>
  /**
   * Delete zero or more States.
   * @param {StateDeleteManyArgs} args - Arguments to filter States to delete.
   * @example
   * // Delete a few States
   * const { count } = await prisma.state.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends StateDeleteManyArgs>(
    args: Subset<T, StateDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more States.
   * @param {StateUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many States
   * const state = await prisma.state.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends StateUpdateManyArgs>(
    args: Subset<T, StateUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one State.
   * @param {StateUpsertArgs} args - Arguments to update or create a State.
   * @example
   * // Update or create a State
   * const state = await prisma.state.upsert({
   *   create: {
   *     // ... data to create a State
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the State we want to update
   *   }
   * })
  **/
  upsert<T extends StateUpsertArgs>(
    args: Subset<T, StateUpsertArgs>
  ): CheckSelect<T, Prisma__StateClient<State>, Prisma__StateClient<StateGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyStateArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateStateArgs>(args: Subset<T, AggregateStateArgs>): Promise<GetStateAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for State.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__StateClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  policy<T extends PolicyArgs = {}>(args?: Subset<T, PolicyArgs>): CheckSelect<T, Prisma__PolicyClient<Policy | null>, Prisma__PolicyClient<PolicyGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * State findOne
 */
export type FindOneStateArgs = {
  /**
   * Select specific fields to fetch from the State
  **/
  select?: StateSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: StateInclude | null
  /**
   * Filter, which State to fetch.
  **/
  where: StateWhereUniqueInput
}


/**
 * State findMany
 */
export type FindManyStateArgs = {
  /**
   * Select specific fields to fetch from the State
  **/
  select?: StateSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: StateInclude | null
  /**
   * Filter, which States to fetch.
  **/
  where?: StateWhereInput
  /**
   * Determine the order of the States to fetch.
  **/
  orderBy?: Enumerable<StateOrderByInput>
  /**
   * Sets the position for listing States.
  **/
  cursor?: StateWhereUniqueInput
  /**
   * The number of States to fetch. If negative number, it will take States before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` States.
  **/
  skip?: number
  distinct?: Enumerable<StateDistinctFieldEnum>
}


/**
 * State create
 */
export type StateCreateArgs = {
  /**
   * Select specific fields to fetch from the State
  **/
  select?: StateSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: StateInclude | null
  /**
   * The data needed to create a State.
  **/
  data: StateCreateInput
}


/**
 * State update
 */
export type StateUpdateArgs = {
  /**
   * Select specific fields to fetch from the State
  **/
  select?: StateSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: StateInclude | null
  /**
   * The data needed to update a State.
  **/
  data: StateUpdateInput
  /**
   * Choose, which State to update.
  **/
  where: StateWhereUniqueInput
}


/**
 * State updateMany
 */
export type StateUpdateManyArgs = {
  data: StateUpdateManyMutationInput
  where?: StateWhereInput
}


/**
 * State upsert
 */
export type StateUpsertArgs = {
  /**
   * Select specific fields to fetch from the State
  **/
  select?: StateSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: StateInclude | null
  /**
   * The filter to search for the State to update in case it exists.
  **/
  where: StateWhereUniqueInput
  /**
   * In case the State found by the `where` argument doesn't exist, create a new State with this data.
  **/
  create: StateCreateInput
  /**
   * In case the State was found with the provided `where` argument, update it with this data.
  **/
  update: StateUpdateInput
}


/**
 * State delete
 */
export type StateDeleteArgs = {
  /**
   * Select specific fields to fetch from the State
  **/
  select?: StateSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: StateInclude | null
  /**
   * Filter which State to delete.
  **/
  where: StateWhereUniqueInput
}


/**
 * State deleteMany
 */
export type StateDeleteManyArgs = {
  where?: StateWhereInput
}


/**
 * State without action
 */
export type StateArgs = {
  /**
   * Select specific fields to fetch from the State
  **/
  select?: StateSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: StateInclude | null
}



/**
 * Model Invoice
 */

export type Invoice = {
  id: number
  policy_id: number
  amount_due: number
  due_on: Date
  created: Date
  updated: Date
}


export type AggregateInvoice = {
  count: number
  avg: InvoiceAvgAggregateOutputType | null
  sum: InvoiceSumAggregateOutputType | null
  min: InvoiceMinAggregateOutputType | null
  max: InvoiceMaxAggregateOutputType | null
}

export type InvoiceAvgAggregateOutputType = {
  id: number
  policy_id: number
  amount_due: number
}

export type InvoiceSumAggregateOutputType = {
  id: number
  policy_id: number
  amount_due: number
}

export type InvoiceMinAggregateOutputType = {
  id: number
  policy_id: number
  amount_due: number
}

export type InvoiceMaxAggregateOutputType = {
  id: number
  policy_id: number
  amount_due: number
}


export type InvoiceAvgAggregateInputType = {
  id?: true
  policy_id?: true
  amount_due?: true
}

export type InvoiceSumAggregateInputType = {
  id?: true
  policy_id?: true
  amount_due?: true
}

export type InvoiceMinAggregateInputType = {
  id?: true
  policy_id?: true
  amount_due?: true
}

export type InvoiceMaxAggregateInputType = {
  id?: true
  policy_id?: true
  amount_due?: true
}

export type AggregateInvoiceArgs = {
  where?: InvoiceWhereInput
  orderBy?: Enumerable<InvoiceOrderByInput>
  cursor?: InvoiceWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<InvoiceDistinctFieldEnum>
  count?: true
  avg?: InvoiceAvgAggregateInputType
  sum?: InvoiceSumAggregateInputType
  min?: InvoiceMinAggregateInputType
  max?: InvoiceMaxAggregateInputType
}

export type GetInvoiceAggregateType<T extends AggregateInvoiceArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetInvoiceAggregateScalarType<T[P]>
}

export type GetInvoiceAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof InvoiceAvgAggregateOutputType ? InvoiceAvgAggregateOutputType[P] : never
}
    
    

export type InvoiceSelect = {
  id?: boolean
  policy_id?: boolean
  amount_due?: boolean
  due_on?: boolean
  created?: boolean
  updated?: boolean
  policy?: boolean | PolicyArgs
}

export type InvoiceInclude = {
  policy?: boolean | PolicyArgs
}

export type InvoiceGetPayload<
  S extends boolean | null | undefined | InvoiceArgs,
  U = keyof S
> = S extends true
  ? Invoice
  : S extends undefined
  ? never
  : S extends InvoiceArgs | FindManyInvoiceArgs
  ? 'include' extends U
    ? Invoice  & {
      [P in TrueKeys<S['include']>]:
      P extends 'policy'
      ? PolicyGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Invoice ? Invoice[P]
: 
      P extends 'policy'
      ? PolicyGetPayload<S['select'][P]> : never
    }
  : Invoice
: Invoice


export interface InvoiceDelegate {
  /**
   * Find zero or one Invoice.
   * @param {FindOneInvoiceArgs} args - Arguments to find a Invoice
   * @example
   * // Get one Invoice
   * const invoice = await prisma.invoice.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneInvoiceArgs>(
    args: Subset<T, FindOneInvoiceArgs>
  ): CheckSelect<T, Prisma__InvoiceClient<Invoice | null>, Prisma__InvoiceClient<InvoiceGetPayload<T> | null>>
  /**
   * Find zero or more Invoices.
   * @param {FindManyInvoiceArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Invoices
   * const invoices = await prisma.invoice.findMany()
   * 
   * // Get first 10 Invoices
   * const invoices = await prisma.invoice.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const invoiceWithIdOnly = await prisma.invoice.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyInvoiceArgs>(
    args?: Subset<T, FindManyInvoiceArgs>
  ): CheckSelect<T, Promise<Array<Invoice>>, Promise<Array<InvoiceGetPayload<T>>>>
  /**
   * Create a Invoice.
   * @param {InvoiceCreateArgs} args - Arguments to create a Invoice.
   * @example
   * // Create one Invoice
   * const Invoice = await prisma.invoice.create({
   *   data: {
   *     // ... data to create a Invoice
   *   }
   * })
   * 
  **/
  create<T extends InvoiceCreateArgs>(
    args: Subset<T, InvoiceCreateArgs>
  ): CheckSelect<T, Prisma__InvoiceClient<Invoice>, Prisma__InvoiceClient<InvoiceGetPayload<T>>>
  /**
   * Delete a Invoice.
   * @param {InvoiceDeleteArgs} args - Arguments to delete one Invoice.
   * @example
   * // Delete one Invoice
   * const Invoice = await prisma.invoice.delete({
   *   where: {
   *     // ... filter to delete one Invoice
   *   }
   * })
   * 
  **/
  delete<T extends InvoiceDeleteArgs>(
    args: Subset<T, InvoiceDeleteArgs>
  ): CheckSelect<T, Prisma__InvoiceClient<Invoice>, Prisma__InvoiceClient<InvoiceGetPayload<T>>>
  /**
   * Update one Invoice.
   * @param {InvoiceUpdateArgs} args - Arguments to update one Invoice.
   * @example
   * // Update one Invoice
   * const invoice = await prisma.invoice.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends InvoiceUpdateArgs>(
    args: Subset<T, InvoiceUpdateArgs>
  ): CheckSelect<T, Prisma__InvoiceClient<Invoice>, Prisma__InvoiceClient<InvoiceGetPayload<T>>>
  /**
   * Delete zero or more Invoices.
   * @param {InvoiceDeleteManyArgs} args - Arguments to filter Invoices to delete.
   * @example
   * // Delete a few Invoices
   * const { count } = await prisma.invoice.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends InvoiceDeleteManyArgs>(
    args: Subset<T, InvoiceDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Invoices.
   * @param {InvoiceUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Invoices
   * const invoice = await prisma.invoice.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends InvoiceUpdateManyArgs>(
    args: Subset<T, InvoiceUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Invoice.
   * @param {InvoiceUpsertArgs} args - Arguments to update or create a Invoice.
   * @example
   * // Update or create a Invoice
   * const invoice = await prisma.invoice.upsert({
   *   create: {
   *     // ... data to create a Invoice
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Invoice we want to update
   *   }
   * })
  **/
  upsert<T extends InvoiceUpsertArgs>(
    args: Subset<T, InvoiceUpsertArgs>
  ): CheckSelect<T, Prisma__InvoiceClient<Invoice>, Prisma__InvoiceClient<InvoiceGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyInvoiceArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateInvoiceArgs>(args: Subset<T, AggregateInvoiceArgs>): Promise<GetInvoiceAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Invoice.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__InvoiceClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  policy<T extends PolicyArgs = {}>(args?: Subset<T, PolicyArgs>): CheckSelect<T, Prisma__PolicyClient<Policy | null>, Prisma__PolicyClient<PolicyGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Invoice findOne
 */
export type FindOneInvoiceArgs = {
  /**
   * Select specific fields to fetch from the Invoice
  **/
  select?: InvoiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: InvoiceInclude | null
  /**
   * Filter, which Invoice to fetch.
  **/
  where: InvoiceWhereUniqueInput
}


/**
 * Invoice findMany
 */
export type FindManyInvoiceArgs = {
  /**
   * Select specific fields to fetch from the Invoice
  **/
  select?: InvoiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: InvoiceInclude | null
  /**
   * Filter, which Invoices to fetch.
  **/
  where?: InvoiceWhereInput
  /**
   * Determine the order of the Invoices to fetch.
  **/
  orderBy?: Enumerable<InvoiceOrderByInput>
  /**
   * Sets the position for listing Invoices.
  **/
  cursor?: InvoiceWhereUniqueInput
  /**
   * The number of Invoices to fetch. If negative number, it will take Invoices before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Invoices.
  **/
  skip?: number
  distinct?: Enumerable<InvoiceDistinctFieldEnum>
}


/**
 * Invoice create
 */
export type InvoiceCreateArgs = {
  /**
   * Select specific fields to fetch from the Invoice
  **/
  select?: InvoiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: InvoiceInclude | null
  /**
   * The data needed to create a Invoice.
  **/
  data: InvoiceCreateInput
}


/**
 * Invoice update
 */
export type InvoiceUpdateArgs = {
  /**
   * Select specific fields to fetch from the Invoice
  **/
  select?: InvoiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: InvoiceInclude | null
  /**
   * The data needed to update a Invoice.
  **/
  data: InvoiceUpdateInput
  /**
   * Choose, which Invoice to update.
  **/
  where: InvoiceWhereUniqueInput
}


/**
 * Invoice updateMany
 */
export type InvoiceUpdateManyArgs = {
  data: InvoiceUpdateManyMutationInput
  where?: InvoiceWhereInput
}


/**
 * Invoice upsert
 */
export type InvoiceUpsertArgs = {
  /**
   * Select specific fields to fetch from the Invoice
  **/
  select?: InvoiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: InvoiceInclude | null
  /**
   * The filter to search for the Invoice to update in case it exists.
  **/
  where: InvoiceWhereUniqueInput
  /**
   * In case the Invoice found by the `where` argument doesn't exist, create a new Invoice with this data.
  **/
  create: InvoiceCreateInput
  /**
   * In case the Invoice was found with the provided `where` argument, update it with this data.
  **/
  update: InvoiceUpdateInput
}


/**
 * Invoice delete
 */
export type InvoiceDeleteArgs = {
  /**
   * Select specific fields to fetch from the Invoice
  **/
  select?: InvoiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: InvoiceInclude | null
  /**
   * Filter which Invoice to delete.
  **/
  where: InvoiceWhereUniqueInput
}


/**
 * Invoice deleteMany
 */
export type InvoiceDeleteManyArgs = {
  where?: InvoiceWhereInput
}


/**
 * Invoice without action
 */
export type InvoiceArgs = {
  /**
   * Select specific fields to fetch from the Invoice
  **/
  select?: InvoiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: InvoiceInclude | null
}



/**
 * Model Payment
 */

export type Payment = {
  id: number
  policy_id: number
  payment_amount: number
  created: Date
  updated: Date
}


export type AggregatePayment = {
  count: number
  avg: PaymentAvgAggregateOutputType | null
  sum: PaymentSumAggregateOutputType | null
  min: PaymentMinAggregateOutputType | null
  max: PaymentMaxAggregateOutputType | null
}

export type PaymentAvgAggregateOutputType = {
  id: number
  policy_id: number
  payment_amount: number
}

export type PaymentSumAggregateOutputType = {
  id: number
  policy_id: number
  payment_amount: number
}

export type PaymentMinAggregateOutputType = {
  id: number
  policy_id: number
  payment_amount: number
}

export type PaymentMaxAggregateOutputType = {
  id: number
  policy_id: number
  payment_amount: number
}


export type PaymentAvgAggregateInputType = {
  id?: true
  policy_id?: true
  payment_amount?: true
}

export type PaymentSumAggregateInputType = {
  id?: true
  policy_id?: true
  payment_amount?: true
}

export type PaymentMinAggregateInputType = {
  id?: true
  policy_id?: true
  payment_amount?: true
}

export type PaymentMaxAggregateInputType = {
  id?: true
  policy_id?: true
  payment_amount?: true
}

export type AggregatePaymentArgs = {
  where?: PaymentWhereInput
  orderBy?: Enumerable<PaymentOrderByInput>
  cursor?: PaymentWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PaymentDistinctFieldEnum>
  count?: true
  avg?: PaymentAvgAggregateInputType
  sum?: PaymentSumAggregateInputType
  min?: PaymentMinAggregateInputType
  max?: PaymentMaxAggregateInputType
}

export type GetPaymentAggregateType<T extends AggregatePaymentArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetPaymentAggregateScalarType<T[P]>
}

export type GetPaymentAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof PaymentAvgAggregateOutputType ? PaymentAvgAggregateOutputType[P] : never
}
    
    

export type PaymentSelect = {
  id?: boolean
  policy_id?: boolean
  payment_amount?: boolean
  created?: boolean
  updated?: boolean
  policy?: boolean | PolicyArgs
}

export type PaymentInclude = {
  policy?: boolean | PolicyArgs
}

export type PaymentGetPayload<
  S extends boolean | null | undefined | PaymentArgs,
  U = keyof S
> = S extends true
  ? Payment
  : S extends undefined
  ? never
  : S extends PaymentArgs | FindManyPaymentArgs
  ? 'include' extends U
    ? Payment  & {
      [P in TrueKeys<S['include']>]:
      P extends 'policy'
      ? PolicyGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Payment ? Payment[P]
: 
      P extends 'policy'
      ? PolicyGetPayload<S['select'][P]> : never
    }
  : Payment
: Payment


export interface PaymentDelegate {
  /**
   * Find zero or one Payment.
   * @param {FindOnePaymentArgs} args - Arguments to find a Payment
   * @example
   * // Get one Payment
   * const payment = await prisma.payment.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePaymentArgs>(
    args: Subset<T, FindOnePaymentArgs>
  ): CheckSelect<T, Prisma__PaymentClient<Payment | null>, Prisma__PaymentClient<PaymentGetPayload<T> | null>>
  /**
   * Find zero or more Payments.
   * @param {FindManyPaymentArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Payments
   * const payments = await prisma.payment.findMany()
   * 
   * // Get first 10 Payments
   * const payments = await prisma.payment.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyPaymentArgs>(
    args?: Subset<T, FindManyPaymentArgs>
  ): CheckSelect<T, Promise<Array<Payment>>, Promise<Array<PaymentGetPayload<T>>>>
  /**
   * Create a Payment.
   * @param {PaymentCreateArgs} args - Arguments to create a Payment.
   * @example
   * // Create one Payment
   * const Payment = await prisma.payment.create({
   *   data: {
   *     // ... data to create a Payment
   *   }
   * })
   * 
  **/
  create<T extends PaymentCreateArgs>(
    args: Subset<T, PaymentCreateArgs>
  ): CheckSelect<T, Prisma__PaymentClient<Payment>, Prisma__PaymentClient<PaymentGetPayload<T>>>
  /**
   * Delete a Payment.
   * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
   * @example
   * // Delete one Payment
   * const Payment = await prisma.payment.delete({
   *   where: {
   *     // ... filter to delete one Payment
   *   }
   * })
   * 
  **/
  delete<T extends PaymentDeleteArgs>(
    args: Subset<T, PaymentDeleteArgs>
  ): CheckSelect<T, Prisma__PaymentClient<Payment>, Prisma__PaymentClient<PaymentGetPayload<T>>>
  /**
   * Update one Payment.
   * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
   * @example
   * // Update one Payment
   * const payment = await prisma.payment.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends PaymentUpdateArgs>(
    args: Subset<T, PaymentUpdateArgs>
  ): CheckSelect<T, Prisma__PaymentClient<Payment>, Prisma__PaymentClient<PaymentGetPayload<T>>>
  /**
   * Delete zero or more Payments.
   * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
   * @example
   * // Delete a few Payments
   * const { count } = await prisma.payment.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends PaymentDeleteManyArgs>(
    args: Subset<T, PaymentDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Payments.
   * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Payments
   * const payment = await prisma.payment.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends PaymentUpdateManyArgs>(
    args: Subset<T, PaymentUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Payment.
   * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
   * @example
   * // Update or create a Payment
   * const payment = await prisma.payment.upsert({
   *   create: {
   *     // ... data to create a Payment
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Payment we want to update
   *   }
   * })
  **/
  upsert<T extends PaymentUpsertArgs>(
    args: Subset<T, PaymentUpsertArgs>
  ): CheckSelect<T, Prisma__PaymentClient<Payment>, Prisma__PaymentClient<PaymentGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyPaymentArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregatePaymentArgs>(args: Subset<T, AggregatePaymentArgs>): Promise<GetPaymentAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Payment.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__PaymentClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  policy<T extends PolicyArgs = {}>(args?: Subset<T, PolicyArgs>): CheckSelect<T, Prisma__PolicyClient<Policy | null>, Prisma__PolicyClient<PolicyGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Payment findOne
 */
export type FindOnePaymentArgs = {
  /**
   * Select specific fields to fetch from the Payment
  **/
  select?: PaymentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PaymentInclude | null
  /**
   * Filter, which Payment to fetch.
  **/
  where: PaymentWhereUniqueInput
}


/**
 * Payment findMany
 */
export type FindManyPaymentArgs = {
  /**
   * Select specific fields to fetch from the Payment
  **/
  select?: PaymentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PaymentInclude | null
  /**
   * Filter, which Payments to fetch.
  **/
  where?: PaymentWhereInput
  /**
   * Determine the order of the Payments to fetch.
  **/
  orderBy?: Enumerable<PaymentOrderByInput>
  /**
   * Sets the position for listing Payments.
  **/
  cursor?: PaymentWhereUniqueInput
  /**
   * The number of Payments to fetch. If negative number, it will take Payments before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Payments.
  **/
  skip?: number
  distinct?: Enumerable<PaymentDistinctFieldEnum>
}


/**
 * Payment create
 */
export type PaymentCreateArgs = {
  /**
   * Select specific fields to fetch from the Payment
  **/
  select?: PaymentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PaymentInclude | null
  /**
   * The data needed to create a Payment.
  **/
  data: PaymentCreateInput
}


/**
 * Payment update
 */
export type PaymentUpdateArgs = {
  /**
   * Select specific fields to fetch from the Payment
  **/
  select?: PaymentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PaymentInclude | null
  /**
   * The data needed to update a Payment.
  **/
  data: PaymentUpdateInput
  /**
   * Choose, which Payment to update.
  **/
  where: PaymentWhereUniqueInput
}


/**
 * Payment updateMany
 */
export type PaymentUpdateManyArgs = {
  data: PaymentUpdateManyMutationInput
  where?: PaymentWhereInput
}


/**
 * Payment upsert
 */
export type PaymentUpsertArgs = {
  /**
   * Select specific fields to fetch from the Payment
  **/
  select?: PaymentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PaymentInclude | null
  /**
   * The filter to search for the Payment to update in case it exists.
  **/
  where: PaymentWhereUniqueInput
  /**
   * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
  **/
  create: PaymentCreateInput
  /**
   * In case the Payment was found with the provided `where` argument, update it with this data.
  **/
  update: PaymentUpdateInput
}


/**
 * Payment delete
 */
export type PaymentDeleteArgs = {
  /**
   * Select specific fields to fetch from the Payment
  **/
  select?: PaymentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PaymentInclude | null
  /**
   * Filter which Payment to delete.
  **/
  where: PaymentWhereUniqueInput
}


/**
 * Payment deleteMany
 */
export type PaymentDeleteManyArgs = {
  where?: PaymentWhereInput
}


/**
 * Payment without action
 */
export type PaymentArgs = {
  /**
   * Select specific fields to fetch from the Payment
  **/
  select?: PaymentSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PaymentInclude | null
}



/**
 * Deep Input Types
 */


export type PolicyWhereInput = {
  AND?: Enumerable<PolicyWhereInput>
  OR?: Array<PolicyWhereInput>
  NOT?: Enumerable<PolicyWhereInput>
  id?: number | IntFilter
  number?: string | StringFilter
  annual_premium?: number | FloatNullableFilter | null
  effective_date?: Date | string | DateTimeNullableFilter | null
  created?: Date | string | DateTimeFilter
  updated?: Date | string | DateTimeFilter
  invoice?: InvoiceWhereInput | null
  states?: StateListRelationFilter
  payments?: PaymentListRelationFilter
}

export type PolicyOrderByInput = {
  id?: SortOrder
  number?: SortOrder
  annual_premium?: SortOrder
  effective_date?: SortOrder
  created?: SortOrder
  updated?: SortOrder
}

export type PolicyWhereUniqueInput = {
  id?: number
}

export type StateWhereInput = {
  AND?: Enumerable<StateWhereInput>
  OR?: Array<StateWhereInput>
  NOT?: Enumerable<StateWhereInput>
  id?: number | IntFilter
  policy_id?: number | IntFilter
  status?: string | StringFilter
  reason?: string | StringFilter
  created?: Date | string | DateTimeFilter
  updated?: Date | string | DateTimeFilter
  policy?: PolicyWhereInput | null
}

export type StateOrderByInput = {
  id?: SortOrder
  policy_id?: SortOrder
  status?: SortOrder
  reason?: SortOrder
  created?: SortOrder
  updated?: SortOrder
}

export type StateWhereUniqueInput = {
  id?: number
}

export type InvoiceWhereInput = {
  AND?: Enumerable<InvoiceWhereInput>
  OR?: Array<InvoiceWhereInput>
  NOT?: Enumerable<InvoiceWhereInput>
  id?: number | IntFilter
  policy_id?: number | IntFilter
  amount_due?: number | FloatFilter
  due_on?: Date | string | DateTimeFilter
  created?: Date | string | DateTimeFilter
  updated?: Date | string | DateTimeFilter
  policy?: PolicyWhereInput | null
}

export type InvoiceOrderByInput = {
  id?: SortOrder
  policy_id?: SortOrder
  amount_due?: SortOrder
  due_on?: SortOrder
  created?: SortOrder
  updated?: SortOrder
}

export type InvoiceWhereUniqueInput = {
  id?: number
}

export type PaymentWhereInput = {
  AND?: Enumerable<PaymentWhereInput>
  OR?: Array<PaymentWhereInput>
  NOT?: Enumerable<PaymentWhereInput>
  id?: number | IntFilter
  policy_id?: number | IntFilter
  payment_amount?: number | FloatFilter
  created?: Date | string | DateTimeFilter
  updated?: Date | string | DateTimeFilter
  policy?: PolicyWhereInput | null
}

export type PaymentOrderByInput = {
  id?: SortOrder
  policy_id?: SortOrder
  payment_amount?: SortOrder
  created?: SortOrder
  updated?: SortOrder
}

export type PaymentWhereUniqueInput = {
  id?: number
}

export type PolicyCreateInput = {
  number: string
  annual_premium?: number | null
  effective_date?: Date | string | null
  created?: Date | string
  updated?: Date | string
  invoice?: InvoiceCreateOneWithoutPolicyInput
  states?: StateCreateManyWithoutPolicyInput
  payments?: PaymentCreateManyWithoutPolicyInput
}

export type PolicyUpdateInput = {
  number?: string | StringFieldUpdateOperationsInput
  annual_premium?: number | NullableFloatFieldUpdateOperationsInput | null
  effective_date?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  created?: Date | string | DateTimeFieldUpdateOperationsInput
  updated?: Date | string | DateTimeFieldUpdateOperationsInput
  invoice?: InvoiceUpdateOneRequiredWithoutPolicyInput
  states?: StateUpdateManyWithoutPolicyInput
  payments?: PaymentUpdateManyWithoutPolicyInput
}

export type PolicyUpdateManyMutationInput = {
  number?: string | StringFieldUpdateOperationsInput
  annual_premium?: number | NullableFloatFieldUpdateOperationsInput | null
  effective_date?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  created?: Date | string | DateTimeFieldUpdateOperationsInput
  updated?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type StateCreateInput = {
  status: string
  reason: string
  created?: Date | string
  updated?: Date | string
  policy: PolicyCreateOneWithoutStatesInput
}

export type StateUpdateInput = {
  status?: string | StringFieldUpdateOperationsInput
  reason?: string | StringFieldUpdateOperationsInput
  created?: Date | string | DateTimeFieldUpdateOperationsInput
  updated?: Date | string | DateTimeFieldUpdateOperationsInput
  policy?: PolicyUpdateOneRequiredWithoutStatesInput
}

export type StateUpdateManyMutationInput = {
  status?: string | StringFieldUpdateOperationsInput
  reason?: string | StringFieldUpdateOperationsInput
  created?: Date | string | DateTimeFieldUpdateOperationsInput
  updated?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type InvoiceCreateInput = {
  amount_due: number
  due_on: Date | string
  created?: Date | string
  updated?: Date | string
  policy: PolicyCreateOneWithoutInvoiceInput
}

export type InvoiceUpdateInput = {
  amount_due?: number | FloatFieldUpdateOperationsInput
  due_on?: Date | string | DateTimeFieldUpdateOperationsInput
  created?: Date | string | DateTimeFieldUpdateOperationsInput
  updated?: Date | string | DateTimeFieldUpdateOperationsInput
  policy?: PolicyUpdateOneRequiredWithoutInvoiceInput
}

export type InvoiceUpdateManyMutationInput = {
  amount_due?: number | FloatFieldUpdateOperationsInput
  due_on?: Date | string | DateTimeFieldUpdateOperationsInput
  created?: Date | string | DateTimeFieldUpdateOperationsInput
  updated?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type PaymentCreateInput = {
  payment_amount: number
  created?: Date | string
  updated?: Date | string
  policy: PolicyCreateOneWithoutPaymentsInput
}

export type PaymentUpdateInput = {
  payment_amount?: number | FloatFieldUpdateOperationsInput
  created?: Date | string | DateTimeFieldUpdateOperationsInput
  updated?: Date | string | DateTimeFieldUpdateOperationsInput
  policy?: PolicyUpdateOneRequiredWithoutPaymentsInput
}

export type PaymentUpdateManyMutationInput = {
  payment_amount?: number | FloatFieldUpdateOperationsInput
  created?: Date | string | DateTimeFieldUpdateOperationsInput
  updated?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type FloatNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number | null
  lte?: number | null
  gt?: number | null
  gte?: number | null
  not?: number | NestedFloatNullableFilter | null
}

export type DateTimeNullableFilter = {
  equals?: Date | string | null
  in?: Enumerable<Date | string> | null
  notIn?: Enumerable<Date | string> | null
  lt?: Date | string | null
  lte?: Date | string | null
  gt?: Date | string | null
  gte?: Date | string | null
  not?: Date | string | NestedDateTimeNullableFilter | null
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date | string>
  notIn?: Enumerable<Date | string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type InvoiceRelationFilter = {
  is?: InvoiceWhereInput | null
  isNot?: InvoiceWhereInput | null
}

export type StateListRelationFilter = {
  every?: StateWhereInput
  some?: StateWhereInput
  none?: StateWhereInput
}

export type PaymentListRelationFilter = {
  every?: PaymentWhereInput
  some?: PaymentWhereInput
  none?: PaymentWhereInput
}

export type PolicyRelationFilter = {
  is?: PolicyWhereInput | null
  isNot?: PolicyWhereInput | null
}

export type FloatFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedFloatFilter
}

export type InvoiceCreateOneWithoutPolicyInput = {
  create?: InvoiceCreateWithoutPolicyInput
  connect?: InvoiceWhereUniqueInput
}

export type StateCreateManyWithoutPolicyInput = {
  create?: Enumerable<StateCreateWithoutPolicyInput>
  connect?: Enumerable<StateWhereUniqueInput>
}

export type PaymentCreateManyWithoutPolicyInput = {
  create?: Enumerable<PaymentCreateWithoutPolicyInput>
  connect?: Enumerable<PaymentWhereUniqueInput>
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type NullableFloatFieldUpdateOperationsInput = {
  set?: number | null
}

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: Date | string | null
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type InvoiceUpdateOneRequiredWithoutPolicyInput = {
  create?: InvoiceCreateWithoutPolicyInput
  connect?: InvoiceWhereUniqueInput
  update?: InvoiceUpdateWithoutPolicyDataInput
  upsert?: InvoiceUpsertWithoutPolicyInput
}

export type StateUpdateManyWithoutPolicyInput = {
  create?: Enumerable<StateCreateWithoutPolicyInput>
  connect?: Enumerable<StateWhereUniqueInput>
  set?: Enumerable<StateWhereUniqueInput>
  disconnect?: Enumerable<StateWhereUniqueInput>
  delete?: Enumerable<StateWhereUniqueInput>
  update?: Enumerable<StateUpdateWithWhereUniqueWithoutPolicyInput>
  updateMany?: Enumerable<StateUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<StateScalarWhereInput>
  upsert?: Enumerable<StateUpsertWithWhereUniqueWithoutPolicyInput>
}

export type PaymentUpdateManyWithoutPolicyInput = {
  create?: Enumerable<PaymentCreateWithoutPolicyInput>
  connect?: Enumerable<PaymentWhereUniqueInput>
  set?: Enumerable<PaymentWhereUniqueInput>
  disconnect?: Enumerable<PaymentWhereUniqueInput>
  delete?: Enumerable<PaymentWhereUniqueInput>
  update?: Enumerable<PaymentUpdateWithWhereUniqueWithoutPolicyInput>
  updateMany?: Enumerable<PaymentUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<PaymentScalarWhereInput>
  upsert?: Enumerable<PaymentUpsertWithWhereUniqueWithoutPolicyInput>
}

export type PolicyCreateOneWithoutStatesInput = {
  create?: PolicyCreateWithoutStatesInput
  connect?: PolicyWhereUniqueInput
}

export type PolicyUpdateOneRequiredWithoutStatesInput = {
  create?: PolicyCreateWithoutStatesInput
  connect?: PolicyWhereUniqueInput
  update?: PolicyUpdateWithoutStatesDataInput
  upsert?: PolicyUpsertWithoutStatesInput
}

export type PolicyCreateOneWithoutInvoiceInput = {
  create?: PolicyCreateWithoutInvoiceInput
  connect?: PolicyWhereUniqueInput
}

export type FloatFieldUpdateOperationsInput = {
  set?: number
}

export type PolicyUpdateOneRequiredWithoutInvoiceInput = {
  create?: PolicyCreateWithoutInvoiceInput
  connect?: PolicyWhereUniqueInput
  update?: PolicyUpdateWithoutInvoiceDataInput
  upsert?: PolicyUpsertWithoutInvoiceInput
}

export type PolicyCreateOneWithoutPaymentsInput = {
  create?: PolicyCreateWithoutPaymentsInput
  connect?: PolicyWhereUniqueInput
}

export type PolicyUpdateOneRequiredWithoutPaymentsInput = {
  create?: PolicyCreateWithoutPaymentsInput
  connect?: PolicyWhereUniqueInput
  update?: PolicyUpdateWithoutPaymentsDataInput
  upsert?: PolicyUpsertWithoutPaymentsInput
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedIntFilter | null
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringFilter | null
}

export type NestedFloatNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number | null
  lte?: number | null
  gt?: number | null
  gte?: number | null
  not?: NestedFloatNullableFilter | null
}

export type NestedDateTimeNullableFilter = {
  equals?: Date | string | null
  in?: Enumerable<Date | string> | null
  notIn?: Enumerable<Date | string> | null
  lt?: Date | string | null
  lte?: Date | string | null
  gt?: Date | string | null
  gte?: Date | string | null
  not?: NestedDateTimeNullableFilter | null
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date | string>
  notIn?: Enumerable<Date | string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: NestedDateTimeFilter | null
}

export type NestedFloatFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedFloatFilter | null
}

export type InvoiceCreateWithoutPolicyInput = {
  amount_due: number
  due_on: Date | string
  created?: Date | string
  updated?: Date | string
}

export type StateCreateWithoutPolicyInput = {
  status: string
  reason: string
  created?: Date | string
  updated?: Date | string
}

export type PaymentCreateWithoutPolicyInput = {
  payment_amount: number
  created?: Date | string
  updated?: Date | string
}

export type InvoiceUpdateWithoutPolicyDataInput = {
  amount_due?: number | FloatFieldUpdateOperationsInput
  due_on?: Date | string | DateTimeFieldUpdateOperationsInput
  created?: Date | string | DateTimeFieldUpdateOperationsInput
  updated?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type InvoiceUpsertWithoutPolicyInput = {
  update: InvoiceUpdateWithoutPolicyDataInput
  create: InvoiceCreateWithoutPolicyInput
}

export type StateUpdateWithWhereUniqueWithoutPolicyInput = {
  where: StateWhereUniqueInput
  data: StateUpdateWithoutPolicyDataInput
}

export type StateUpdateManyWithWhereNestedInput = {
  where: StateScalarWhereInput
  data: StateUpdateManyDataInput
}

export type StateScalarWhereInput = {
  AND?: Enumerable<StateScalarWhereInput>
  OR?: Array<StateScalarWhereInput>
  NOT?: Enumerable<StateScalarWhereInput>
  id?: number | IntFilter
  policy_id?: number | IntFilter
  status?: string | StringFilter
  reason?: string | StringFilter
  created?: Date | string | DateTimeFilter
  updated?: Date | string | DateTimeFilter
}

export type StateUpsertWithWhereUniqueWithoutPolicyInput = {
  where: StateWhereUniqueInput
  update: StateUpdateWithoutPolicyDataInput
  create: StateCreateWithoutPolicyInput
}

export type PaymentUpdateWithWhereUniqueWithoutPolicyInput = {
  where: PaymentWhereUniqueInput
  data: PaymentUpdateWithoutPolicyDataInput
}

export type PaymentUpdateManyWithWhereNestedInput = {
  where: PaymentScalarWhereInput
  data: PaymentUpdateManyDataInput
}

export type PaymentScalarWhereInput = {
  AND?: Enumerable<PaymentScalarWhereInput>
  OR?: Array<PaymentScalarWhereInput>
  NOT?: Enumerable<PaymentScalarWhereInput>
  id?: number | IntFilter
  policy_id?: number | IntFilter
  payment_amount?: number | FloatFilter
  created?: Date | string | DateTimeFilter
  updated?: Date | string | DateTimeFilter
}

export type PaymentUpsertWithWhereUniqueWithoutPolicyInput = {
  where: PaymentWhereUniqueInput
  update: PaymentUpdateWithoutPolicyDataInput
  create: PaymentCreateWithoutPolicyInput
}

export type PolicyCreateWithoutStatesInput = {
  number: string
  annual_premium?: number | null
  effective_date?: Date | string | null
  created?: Date | string
  updated?: Date | string
  invoice?: InvoiceCreateOneWithoutPolicyInput
  payments?: PaymentCreateManyWithoutPolicyInput
}

export type PolicyUpdateWithoutStatesDataInput = {
  number?: string | StringFieldUpdateOperationsInput
  annual_premium?: number | NullableFloatFieldUpdateOperationsInput | null
  effective_date?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  created?: Date | string | DateTimeFieldUpdateOperationsInput
  updated?: Date | string | DateTimeFieldUpdateOperationsInput
  invoice?: InvoiceUpdateOneRequiredWithoutPolicyInput
  payments?: PaymentUpdateManyWithoutPolicyInput
}

export type PolicyUpsertWithoutStatesInput = {
  update: PolicyUpdateWithoutStatesDataInput
  create: PolicyCreateWithoutStatesInput
}

export type PolicyCreateWithoutInvoiceInput = {
  number: string
  annual_premium?: number | null
  effective_date?: Date | string | null
  created?: Date | string
  updated?: Date | string
  states?: StateCreateManyWithoutPolicyInput
  payments?: PaymentCreateManyWithoutPolicyInput
}

export type PolicyUpdateWithoutInvoiceDataInput = {
  number?: string | StringFieldUpdateOperationsInput
  annual_premium?: number | NullableFloatFieldUpdateOperationsInput | null
  effective_date?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  created?: Date | string | DateTimeFieldUpdateOperationsInput
  updated?: Date | string | DateTimeFieldUpdateOperationsInput
  states?: StateUpdateManyWithoutPolicyInput
  payments?: PaymentUpdateManyWithoutPolicyInput
}

export type PolicyUpsertWithoutInvoiceInput = {
  update: PolicyUpdateWithoutInvoiceDataInput
  create: PolicyCreateWithoutInvoiceInput
}

export type PolicyCreateWithoutPaymentsInput = {
  number: string
  annual_premium?: number | null
  effective_date?: Date | string | null
  created?: Date | string
  updated?: Date | string
  invoice?: InvoiceCreateOneWithoutPolicyInput
  states?: StateCreateManyWithoutPolicyInput
}

export type PolicyUpdateWithoutPaymentsDataInput = {
  number?: string | StringFieldUpdateOperationsInput
  annual_premium?: number | NullableFloatFieldUpdateOperationsInput | null
  effective_date?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  created?: Date | string | DateTimeFieldUpdateOperationsInput
  updated?: Date | string | DateTimeFieldUpdateOperationsInput
  invoice?: InvoiceUpdateOneRequiredWithoutPolicyInput
  states?: StateUpdateManyWithoutPolicyInput
}

export type PolicyUpsertWithoutPaymentsInput = {
  update: PolicyUpdateWithoutPaymentsDataInput
  create: PolicyCreateWithoutPaymentsInput
}

export type StateUpdateWithoutPolicyDataInput = {
  status?: string | StringFieldUpdateOperationsInput
  reason?: string | StringFieldUpdateOperationsInput
  created?: Date | string | DateTimeFieldUpdateOperationsInput
  updated?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type StateUpdateManyDataInput = {
  status?: string | StringFieldUpdateOperationsInput
  reason?: string | StringFieldUpdateOperationsInput
  created?: Date | string | DateTimeFieldUpdateOperationsInput
  updated?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type PaymentUpdateWithoutPolicyDataInput = {
  payment_amount?: number | FloatFieldUpdateOperationsInput
  created?: Date | string | DateTimeFieldUpdateOperationsInput
  updated?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type PaymentUpdateManyDataInput = {
  payment_amount?: number | FloatFieldUpdateOperationsInput
  created?: Date | string | DateTimeFieldUpdateOperationsInput
  updated?: Date | string | DateTimeFieldUpdateOperationsInput
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
