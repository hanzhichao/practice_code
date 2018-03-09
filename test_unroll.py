import spock.lang.Unroll
import spock.util.EmbeddedSpecRunner


new EmbeddedSpecRunner().runClass(HttpTest)
class HttpTest extends BaseHttpCase {
  def ideaid
  def content
  def cityhash
  def value
  def setup() {
      super.loginWolongHeader()
      //super.loginAudit()
      
      def param = '{"bizParam":{"startDate":"2018-02-21","endDate":"2018-02-27","styletype":"1003","uid":1061,"level":17,"parentLevel":3,"parentId":202210440,"recordPerPage":20,"reqPageIndex":1,"winfoOrIdeaEmpty":false}}'
      def response = httpBuilder.get(path:'/wolongweb/fanghuaIdea/listCustomized', query:[context:param], headers:header)
      ideaid = response['data']['target']['id'][0]
      turbo.log.info(String.valueOf(ideaid))
      if(ideaid > 0){ // 删除创意
            param =  '{"styleType":1003,"ids":["' + ideaid + '"]}'
            response = super.post('/wolongweb/fanghuaIdea/batchRemove', header, param)
        }
      param = '{"unitIdLongList":["202210440"],"model":{"styleType":1003,"content":"{\\"1_subpath_text\\":\\"子链1\\",\\"1_subpath_url\\":\\"http://www.ctrip.com\\",\\"2_subpath_text\\":\\"宝宝巴士\\",\\"2_subpath_url\\":\\"http://www.ctrip.com\\",\\"3_subpath_text\\":\\"子链3\\",\\"3_subpath_url\\":\\"http://www.ctrip.com\\",\\"4_subpath_text\\":\\"子链4\\",\\"4_subpath_url\\":\\"http://www.ctrip.com\\"}"}}'
      response = super.post('/wolongweb/fanghuaIdea/batchAdd',header,param)
      println(response)
       param = '{"bizParam":{"startDate":"2018-02-21","endDate":"2018-02-27","styletype":"1003","uid":1061,"level":17,"parentLevel":3,"parentId":202210440,"recordPerPage":20,"reqPageIndex":1,"winfoOrIdeaEmpty":false}}'
      response = httpBuilder.get(path:'/wolongweb/fanghuaIdea/listCustomized', query:[context:param], headers:header)
      ideaid = response['data']['target']['id'][0]
      //content =  response['data']['target']['content'][0]
    
      super.loginAudit()
      
      databaseList = sql.rows("select cityhash from cpc_attached_idea_0005 where id=?",ideaid ) 
      databaseList.each{item->
        cityhash = item['cityhash']
       }
      param = '{"userId":1061,"target":'+ cityhash +',"styletype":1003,"auditState":0}'
      println param
      response = super.post('/wolong-audit/web/cpc/base/audit',header,param)
    
      println(response)
      expect:
      assert response.status == 0
    
    }

  @Unroll
  def getAdConvertTest() {
    //先声明一个数据结构
    def param = '{"eventType":600,"auditState":0,"targetList":'{
                "userId":1061,
                "target":{
                  "unitId":1907283,
                  "targetId":30255,
                  "version":1502711809226,
                  "reviewState":1002,
                  "modifyTime":"2017-08-24 17:25:52"}
                }'

    super.loginAudit()
    def databaseList = sql.rows("select * from cpc_attached_idea_0005 where id=?",ideaid)
       
       //循环从数据库取每一条数据，参数组装和发送要写在循环内部，一条数据库结果发送一条请求
       databaseList.each{
          //将数据库对应的字段赋值给，上面声明的param的对应字段 --不确定spock是不是这样赋值的
          param['targetList']['userId'] = Item['userid']        //将数据库得到的一条总的userid字段付给param的targitList下的userId字段
          param['targetList']['target']['unitId'] = Item['unitid']
          param['targetList']['target']['targetId'] = Item['id']
          param['targetList']['target']['version'] = Item['version']
          param['targetList']['target']['reviewState'] = Item['review_state']
          param['targetList']['target']['modifyTime'] = Item['modifyTime']

          println param
          def response = super.post('/web/audit/attachedidea/reAudit',header,param)
          println(response)
          expect:
          assert response.status == 0

        }
  }
  
}

  @Unroll
  def getAdConvertTest() {
    //先声明一个数据结构
    def param = '{"eventType":600,"auditState":0,"targetList":'{
                "userId":1061,
                "target":{
                  "unitId":1907283,
                  "targetId":30255,
                  "version":1502711809226,
                  "reviewState":1002,
                  "modifyTime":"2017-08-24 17:25:52"}
                }'

    super.loginAudit()
    def databaseList = sql.rows("select * from cpc_attached_idea_0005 where id=?",ideaid)
       
       //循环从数据库取每一条数据，参数组装和发送要写在循环内部，一条数据库结果发送一条请求
       databaseList.each{
          //将数据库对应的字段赋值给，上面声明的param的对应字段 --不确定spock是不是这样赋值的
          param['eventType'] = 600
          param['auditState'] = 0
          param['targetList']['userId'] = Item['userid']        //将数据库得到的一条总的userid字段付给param的targitList下的userId字段
          param['targetList']['target']['unitId'] = Item['unitid']
          param['targetList']['target']['targetId'] = Item['id']
          param['targetList']['target']['version'] = Item['version']
          param['targetList']['target']['reviewState'] = Item['review_state']
          param['targetList']['target']['modifyTime'] = Item['modifyTime']

          println param
          def response = super.post('/web/audit/attachedidea/reAudit',header,param)
          println(response)
          expect:
          assert response.status == 0

        }
  }
  
}

