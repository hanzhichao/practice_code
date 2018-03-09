#include <graphics.h>
#include <conio.h>
int main()
{
    initgraph(640, 480);   // 这里和 TC 略有区别
    circle(200, 200, 100); // 画圆，圆心(200, 200)，半径 100
    getch();               // 按任意键继续
    closegraph(); 
}