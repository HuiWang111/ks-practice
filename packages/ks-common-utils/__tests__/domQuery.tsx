import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { domQuery as $ } from '../src/domQuery';

describe('test domQuery api', () => {
  it('domQuery should work', () => {
    render(
      <div className='test-container' id='test'>
        <div className='test-wrapper' id='first-wrapper'>
          <div className='test-inner'>
            <input className='test-input' id='input' value='1' readOnly />
          </div>
        </div>
        <div className='test-wrapper' id='second-wrapper'></div>
        <div className='test-wrapper' id='third-wrapper'></div>
      </div>
    );
        
    // test find method
    const $container = $('.test-container');
    expect($container.length).toBe(1);
    expect($container.find('.test-wrapper').length).toBe(3);
    expect($container.find('.test-wrapper1').length).toBe(0);
        
    // test length attribute
    expect($('#second-wrapper').length).toBe(1);
    expect($('div').length).toBe(6); // render函数会多加一层div
        
    const $input = $container.find('.test-input');
    expect($input.length).toBe(1);

    // test parent & parents method
    expect($input.parent('.test-inner').length).toBe(1);
    expect($input.parent('#test-inner').length).toBe(0);
    expect($input.parents('.test-wrapper').length).toBe(1);
    expect($input.parents('.test-container').length).toBe(1);
    expect($input.parent('div').length).toBe(1);
    expect($input.parents('div').length).toBe(4); // render函数会多加一层div
        
    // test focus method
    $input.focus();
    expect(document.activeElement?.id).toBe('input');

    // test is method
    expect($container.is($container)).toBe(true);
    expect($container.is('.test-container')).toBe(true);
    expect($container.is($container[0])).toBe(true);
    expect($container.is($input)).toBe(false);

    // test attr method
    expect($container.attr('id')).toBe('test');
    $container.attr('id', 'test1');
    expect($container.attr('id')).toBe('test1');
    $container.attr({
      id: 'test2'
    });
    expect($container.attr('id')).toBe('test2');

    // test val method
    expect($input.val()).toBe('1');
    $input.val('2');
    expect($input.val()).toBe('2');

    // test addClass/removeClass/hasClass method
    expect($container.attr('class')).toBe('test-container');
    $container.addClass('new-test-class');
    expect($container.attr('class')).toBe('test-container new-test-class');
    expect($container.hasClass('new-test-class')).toBe(true);
    $container.removeClass('test-container');
    expect($container.attr('class')).toBe('new-test-class');
    expect($container.hasClass('new-test-class')).toBe(true);
    expect($container.hasClass('test-container')).toBe(false);

    // test next method
    const $firstWrap = $container.find('#first-wrapper');
    expect($firstWrap.next('.test-wrapper').attr('id')).toBe('second-wrapper');
    expect($firstWrap.next().attr('id')).toBe('second-wrapper');

    // test nextAll method
    const $firstWrapNextAll = $firstWrap.nextAll();
    expect($firstWrapNextAll.length).toBe(2);
    expect($firstWrapNextAll.eq(0).attr('id')).toBe('second-wrapper');
    expect($firstWrapNextAll.eq(1).attr('id')).toBe('third-wrapper');
    expect($firstWrap.nextAll('#second-wrapper').length).toBe(1);

    // test prev methid
    const $secondWrap = $container.find('#second-wrapper');
    expect($secondWrap.prev('.test-wrapper').length).toBe(1);
    expect($secondWrap.prev().attr('class')).toBe('test-wrapper');

    // test prevAll method
    const $thirdWrap = $container.find('#third-wrapper');
    const $thirdWrapPrevAll = $thirdWrap.prevAll();
    expect($thirdWrapPrevAll.length).toBe(2);
    expect($thirdWrapPrevAll.eq(0).attr('id')).toBe('first-wrapper');
    expect($thirdWrapPrevAll.eq(1).attr('id')).toBe('second-wrapper');
    expect($thirdWrap.prevAll('#first-wrapper').length).toBe(1);

    // test eq method
    const $wrap = $container.find('.test-wrapper');
    expect($wrap.length).toBe(3);
    expect($wrap.eq(0).attr('id')).toBe('first-wrapper');
    expect($wrap.eq(1).attr('id')).toBe('second-wrapper');

    // test index method
    expect($firstWrap.index()).toBe(0);
    expect($secondWrap.index()).toBe(1);
    expect($thirdWrap.index()).toBe(2);

    // test filter method
    expect($wrap.filter((el) => $(el).find('input').length > 0).length).toBe(1);
    expect($wrap.filter((el) => $(el).find('input').length === 1).length).toBe(1);
    expect($wrap.filter((el) => $(el).find('div').length === 0).length).toBe(2);

    const listener = jest.fn();
    // test on method
    $wrap.on('click', listener);
    fireEvent.click($firstWrap[0] as HTMLElement);
    expect(listener).toBeCalledTimes(1);

    // test off method
    $wrap.off('click', listener);
    fireEvent.click($firstWrap[0] as HTMLElement);
    expect(listener).toBeCalledTimes(1);
  });
});
